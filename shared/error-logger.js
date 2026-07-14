(function() {
  const overlayId = 'sketch-error-overlay';
  const buttonId = 'sketch-error-open';
  const copyId = 'sketch-error-copy';
  const closeId = 'sketch-error-close';

  function injectStyles() {
    const css = `
      #${overlayId} {
        position: fixed;
        left: 0;
        right: 0;
        bottom: 0;
        max-height: 45vh;
        background: rgba(15, 15, 15, 0.95);
        color: #f8f8f2;
        font-family: Menlo, Consolas, Monaco, monospace;
        font-size: 13px;
        line-height: 1.4;
        border-top: 3px solid #ff5555;
        padding: 12px;
        box-sizing: border-box;
        overflow: auto;
        z-index: 99999;
        display: none;
      }
      #${overlayId} h2 {
        margin: 0 0 8px;
        font-size: 15px;
      }
      #${overlayId} pre {
        margin: 0;
        white-space: pre-wrap;
        word-break: break-word;
      }
      #${overlayId} .button-row {
        display: flex;
        gap: 8px;
        margin: 10px 0 12px;
      }
      #${overlayId} button {
        background: #282a36;
        color: #f8f8f2;
        border: 1px solid #6272a4;
        padding: 6px 10px;
        cursor: pointer;
        border-radius: 4px;
      }
      #${buttonId} {
        position: fixed;
        right: 16px;
        bottom: 16px;
        z-index: 99998;
        background: #ff79c6;
        color: #1e1f29;
        border: none;
        border-radius: 999px;
        padding: 10px 14px;
        font-weight: 700;
        box-shadow: 0 6px 20px rgba(0,0,0,0.18);
      }
      #${buttonId}:hover {
        opacity: 0.95;
      }
    `;
    const style = document.createElement('style');
    style.textContent = css;
    document.head.appendChild(style);
  }

  function createOverlay() {
    const overlay = document.createElement('div');
    overlay.id = overlayId;

    const header = document.createElement('h2');
    header.textContent = 'Sketch error log';

    const buttonRow = document.createElement('div');
    buttonRow.className = 'button-row';

    const copyButton = document.createElement('button');
    copyButton.id = copyId;
    copyButton.textContent = 'Copy error text';
    copyButton.addEventListener('click', () => copyErrorText());

    const closeButton = document.createElement('button');
    closeButton.id = closeId;
    closeButton.textContent = 'Close';
    closeButton.addEventListener('click', () => hideOverlay());

    buttonRow.appendChild(copyButton);
    buttonRow.appendChild(closeButton);

    const message = document.createElement('pre');
    message.id = `${overlayId}-message`;
    message.textContent = 'No errors yet.';

    const help = document.createElement('div');
    help.style.marginTop = '10px';
    help.style.color = '#b8bdff';
    help.textContent = 'If your sketch fails, the error will appear here automatically. Copy it and paste it into your teacher chat.';

    overlay.appendChild(header);
    overlay.appendChild(buttonRow);
    overlay.appendChild(message);
    overlay.appendChild(help);

    document.body.appendChild(overlay);

    const openButton = document.createElement('button');
    openButton.id = buttonId;
    openButton.textContent = 'Show errors';
    openButton.addEventListener('click', () => showOverlay());
    document.body.appendChild(openButton);

    return overlay;
  }

  function getOverlay() {
    return document.getElementById(overlayId);
  }

  function showOverlay() {
    const overlay = getOverlay();
    if (overlay) overlay.style.display = 'block';
  }

  function hideOverlay() {
    const overlay = getOverlay();
    if (overlay) overlay.style.display = 'none';
  }

  function copyErrorText() {
    const message = document.getElementById(`${overlayId}-message`);
    if (!message) return;
    const text = message.textContent;
    navigator.clipboard?.writeText(text).catch(() => {
      const textarea = document.createElement('textarea');
      textarea.value = text;
      document.body.appendChild(textarea);
      textarea.select();
      document.execCommand('copy');
      document.body.removeChild(textarea);
    });
  }

  function formatError(data) {
    const lines = [];
    lines.push(`Sketch: ${window.location.pathname}`);
    if (data.type) lines.push(`Type: ${data.type}`);
    if (data.message) lines.push(`Message: ${data.message}`);
    if (data.file) lines.push(`File: ${data.file}`);
    if (data.line != null) lines.push(`Line: ${data.line}`);
    if (data.column != null) lines.push(`Column: ${data.column}`);
    if (data.stack) {
      lines.push('Stack:');
      lines.push(data.stack);
    }
    if (data.extra) lines.push(`Extra: ${data.extra}`);
    lines.push('---');
    return lines.join('\n');
  }

  function showError(data) {
    const overlay = getOverlay();
    if (!overlay) return;
    const message = document.getElementById(`${overlayId}-message`);
    if (!message) return;
    const details = formatError(data);
    message.textContent = details;
    overlay.style.display = 'block';
  }

  function handleWindowError(event) {
    const payload = {
      type: 'RuntimeError',
      message: event.message || 'Unknown runtime error',
      file: event.filename || '<unknown file>',
      line: event.lineno,
      column: event.colno,
      stack: event.error?.stack || `at ${event.filename}:${event.lineno}:${event.colno}`,
    };
    showError(payload);
  }

  function handleRejection(event) {
    const reason = event.reason;
    const payload = {
      type: 'UnhandledRejection',
      message: typeof reason === 'string' ? reason : reason?.message || 'Promise rejected',
      stack: reason?.stack || '',
      extra: JSON.stringify(reason, null, 2),
    };
    showError(payload);
  }

  function initErrorLogger() {
    injectStyles();
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', createOverlay);
    } else {
      createOverlay();
    }
    window.addEventListener('error', handleWindowError);
    window.addEventListener('unhandledrejection', handleRejection);
    window.addEventListener('keydown', (event) => {
      if (event.key === 'Escape') hideOverlay();
    });
    window.showSketchError = showError;
  }

  initErrorLogger();
})();
