import re
from typing import Any
from google.genai import types


def _function(name, description, parameters) -> types.FunctionDeclaration:
    return types.FunctionDeclaration(
        name=name, description=description, parameters_json_schema=parameters
    )


TOOLKIT = types.Tool(
    function_declarations=[
        _function(
            "search_services",
            (
                "Search SkylineDB3 services. "
                "Use this for questions about "
                "architecture, masterplanning, "
                "design, permitting, cost strategy, "
                "renders, visualization, or other "
                "SkylineDB3 capabilities."
            ),
            {
                "type": "object",
                "properties": {
                    "query": {
                        "type": "string",
                        "description": (
                            "Service or capability "
                            "to search for. "
                            "Use an empty string "
                            "to list all services."
                        ),
                    }
                },
                "required": ["query"],
            },
        ),
        _function(
            "search_projects",
            (
                "Search SkylineDB3 portfolio projects. "
                "Use this when the user asks for "
                "relevant past project examples."
            ),
            {
                "type": "object",
                "properties": {
                    "query": {
                        "type": "string",
                        "description": (
                            "Project type, service, " "or keyword to search."
                        ),
                    }
                },
                "required": ["query"],
            },
        ),
        _function(
            "search_processes",
            (
                "Search SkylineDB3 project workflows, "
                "including new builds, renovations, "
                "as-builts, remodels, and "
                "3D visualization workflows."
            ),
            {
                "type": "object",
                "properties": {
                    "query": {
                        "type": "string",
                        "description": ("Project or workflow type " "to search for."),
                    }
                },
                "required": ["query"],
            },
        ),
        _function(
            "get_company_info",
            (
                "Get SkylineDB3 public company "
                "information such as location, "
                "brand, email, and WhatsApp."
            ),
            {"type": "object", "properties": {}},
        ),
    ]
)


def _flatten(value: Any) -> str:
    if not value:
        return ""

    if isinstance(value, dict):
        return " ".join(_flatten(item, dict) for item in value.values())

    if isinstance(value, list):
        return " ".join(_flatten(item, list) for item in value)

    return str(value)


def _terms(query: str) -> list[str]:
    return re.findall(r"[a-z0-9]+", query.lower())


def _rank(items: list[dict[str, Any]], query: str, limit: int = 4):

    normalized = query.strip().lower()

    list_everything_queries = {
        "",
        "all",
        "services",
        "all services",
        "projects",
        "all projects",
        "processes",
        "all processes",
    }

    if normalized in list_everything_queries:
        return items[:limit]

    terms = _terms(query)

    scored: list[tuple[int, dict[str, Any]]] = []

    for item in items:
        haystack = _flatten(item, list).lower()

        score = sum(haystack.count(term) for term in terms)

        if normalized in haystack:
            score += 5

        if score > 0:
            scored.append((score, item))

    scored.sort(key=lambda pair: pair[0], reverse=True)

    return [item for _, item in scored[:limit]]


def _service_view(
    item: dict[str, Any],
) -> dict[str, Any]:

    return {
        "slug": item.get("slug"),
        "title": item.get("title"),
        "body": item.get("body"),
        "featured": item.get("features", []),
    }


def _project_view(item: dict[str, Any]) -> dict[str, Any]:

    return {
        "slug": item.get("slug"),
        "name": item.get("name"),
        "tagline": item.get("tagline"),
        "metric": item.get("metric"),
        "services": item.get("services", []),
    }


def _process_view(item: dict[str, Any]) -> dict[str, Any]:

    return {
        "slug": item.get("slug"),
        "title": item.get("title"),
        "steps": item.get("steps", []),
    }


def execute_tool(
    name: str, args: dict[str, Any], context: dict[str, Any]
) -> dict[str, Any]:

    if name == "search_services":

        matches = _rank(context.get("services", []), str(args.get("query", "")))

        return {"matches": [_service_view(item) for item in matches]}

    if name == "search_projects":

        matches = _rank(context.get("projects", []), str(args.get("query", "")))

        return {"matches": [_project_view(item) for item in matches]}

    if name == "search_processes":

        matches = _rank(context.get("process", []), str(args.get("query", "")))

        return {"matches": [_process_view(item) for item in matches]}

    if name == "get_company_info":

        return {"settings": context.get("settings", [])}

    return {"error": f"unknown tool {name}"}
