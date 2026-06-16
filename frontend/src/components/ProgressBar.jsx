import './ProgressBar.css';

function ProgressBar({ value, color }) {
    const clampedValue = Math.min(100, Math.max(0, value));
    const barColor = color || (value > 70 ? 'var(--success)' : value > 30 ? 'var(--warning)' : 'var(--danger)');

    return (
        <div className="progress-bar">
            <div
                className="progress-fill"
                style={{ width: `${clampedValue}%`, background: barColor }}
            ></div>
        </div>
    );
}

export default ProgressBar;
