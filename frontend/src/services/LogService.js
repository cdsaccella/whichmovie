import debug from 'debug';

class Log {
  constructor() {
    this.BASE = 'whichmovie-app';
    this.COLOURS = {
      trace: '#92cc41',
      info: '#209cee',
      warn: '#f7d51d',
      error: '#e76e55',
    };
  }

  generateMessage(level, message, source) {
    const namespace = `${this.BASE}:${level}`;
    const createDebug = debug(namespace);

    createDebug.color = this.COLOURS[level];

    if (source) { createDebug(source, message); } else { createDebug(message); }
  }

  trace(message, source) {
    return this.generateMessage('trace', message, source);
  }

  info(message, source) {
    return this.generateMessage('info', message, source);
  }

  warn(message, source) {
    return this.generateMessage('warn', message, source);
  }

  error(message, source) {
    return this.generateMessage('error', message, source);
  }
}

export default new Log();
