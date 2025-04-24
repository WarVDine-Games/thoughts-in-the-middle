export enum LogLevel {
    TRACE = 0,
    DEBUG = 1,
    INFO = 2,
    WARN = 3,
    ERROR = 4,
}

export class Logger {
    /**
     * Logging level. Will log current level and above
     *
     * * Level 0 = TRACE
     * * Level 1 = DEBUG
     * * Level 2 = INFO
     * * Level 3 = WARN
     * * Level 4 = ERROR
     */
    private level: LogLevel;

    private name: string;

    constructor(
        level: LogLevel = LogLevel.DEBUG,
        name: string = "thoughts-in-the-middle-backend",
    ) {
        this.level = level;
        this.name = name;
    }

    /**
     * Trace level logging.
     *
     * NOTE: All messages are passed through JSON.stringify to ensure a level of readability for objects and arrays.
     * Please pass along log messages accordingly.
     */
    trace(messageObject: any): void {
        if (this.level > 0) return;
        console.log(
            `${new Date().toISOString()} [${this.name}] ${JSON.stringify(messageObject)}`,
        );
    }

    /**
     * Debug level logging.
     *
     * NOTE: All messages are passed through JSON.stringify to ensure a level of readability for objects and arrays.
     * Please pass along log messages accordingly.
     */
    debug(messageObject: any): void {
        if (this.level > 1) return;
        console.log(
            `${new Date().toISOString()} [${this.name}] ${JSON.stringify(messageObject)}`,
        );
    }

    /**
     * Info level logging.
     *
     * NOTE: All messages are passed through JSON.stringify to ensure a level of readability for objects and arrays.
     * Please pass along log messages accordingly.
     */
    info(messageObject: any): void {
        if (this.level > 2) return;
        console.log(
            `${new Date().toISOString()} [${this.name}] ${JSON.stringify(messageObject)}`,
        );
    }

    /**
     * Warn level logging.
     *
     * NOTE: All messages are passed through JSON.stringify to ensure a level of readability for objects and arrays.
     * Please pass along log messages accordingly.
     */
    warn(messageObject: any): void {
        if (this.level > 3) return;
        console.warn(
            `${new Date().toISOString()} [${this.name}] ${JSON.stringify(messageObject)}`,
        );
    }

    /**
     * Error level logging.
     *
     * NOTE: All messages are passed through JSON.stringify to ensure a level of readability for objects and arrays.
     * Please pass along log messages accordingly.
     */
    error(messageObject: any): void {
        if (this.level > 4) return;
        console.error(
            `${new Date().toISOString()} [${this.name}] ${JSON.stringify(messageObject)}`,
        );
    }

    /** Creates a promise that will resolve after a given set of time has passed. */
    delay(millisecondsToDelay: number): Promise<void> {
        return new Promise((resolve) =>
            setTimeout(resolve, millisecondsToDelay),
        );
    }
}
