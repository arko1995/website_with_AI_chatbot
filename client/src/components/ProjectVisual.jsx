export default function ProjectVisual({ type = 'grid', label = '' }) {
  return (
    <div className={`project-visual visual-${type}`} aria-label={label}>
      <span className="visual-line line-a" />
      <span className="visual-line line-b" />
      <span className="visual-line line-c" />
      <span className="visual-orbit" />
      <span className="visual-block block-a" />
      <span className="visual-block block-b" />
    </div>
  );
}
