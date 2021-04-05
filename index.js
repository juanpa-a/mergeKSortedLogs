"use strict";

const LogSource = require("./lib/log-source");
const Printer = require("./lib/printer");
const MinHeap = require("./lib/min-heap");

function runSolutions(sourceCount) {
  return new Promise((resolve, reject) => {
    /**
     * Challenge Number 1!
     *
     * Assume that a LogSource only has one method: pop() which will return a LogEntry.
     *
     * A LogEntry is simply an object of the form:
     * {
     * 		date: Date,
     * 		msg: String,
     * }
     *
     * All LogEntries from a given LogSource are guaranteed to be popped in chronological order.
     * Eventually a LogSource will end and return boolean false.
     *
     * Your job is simple: print the sorted merge of all LogEntries across `n` LogSources.
     *
     * Call `printer.print(logEntry)` to print each entry of the merged output as they are ready.
     * This function will ensure that what you print is in fact in chronological order.
     * Call 'printer.done()' at the end to get a few stats on your solution!
     */
    const syncLogSources = [];

    for (let i = 0; i < sourceCount; i++) {
      syncLogSources.push(new LogSource());
    }
    try {
      const LogHeap = new MinHeap();
      const SyncLogPrinter = new Printer();

      require("./solution/sync-sorted-merge")(syncLogSources, new Printer());

      // for (let syncLog of syncLogSources) {
      //   let log = syncLog.pop();
      //   while (log) {
      //     LogHeap.insert(log);
      //     log = syncLog.pop();
      //   }
      // }

      // while (LogHeap.size) {
      //   SyncLogPrinter.print(LogHeap.getMin());
      // }

      const compareDates = (a, b) => {
        return new Date(a.date).getTime() - new Date(b.date).getTime()
      }

      // prettier functional aproach <3
      
      syncLogSources
        .map(log => log.pop())
        .filter(log => log !== false)
        .sort(compareDates)
        .map( v => SyncLogPrinter.print(v))
      
      SyncLogPrinter.done();
      
      resolve();
    } catch (e) {
      reject(e);
    }
  }).then(() => {
    return new Promise(async (resolve, reject) => {
      /**
       * Challenge Number 2!
       *
       * Similar to Challenge Number 1, except now you should assume that a LogSource
       * has only one method: popAsync() which returns a promise that resolves with a LogEntry,
       * or boolean false once the LogSource has ended.
       */

      const AsyncLogPrinter = new Printer();
      const AsyncLogHeap = new MinHeap();
      const asyncLogSources = [];

      for (let i = 0; i < sourceCount; i++) {
        asyncLogSources.push(new LogSource());
      }

      const foldLogs = (logPromises) => {
        Promise.resolve(
          Promise.all(
            logPromises.map((logSource) => {
              return logSource.popAsync();
            })
          ).then((logs) => {
            if (logs.filter(l => l !== false).length) {
              logs.map((log) => {
                if (log) AsyncLogHeap.insert(log);
              });
              foldLogs(asyncLogSources);
            }
            else {
              while (AsyncLogHeap.size) AsyncLogPrinter.print(AsyncLogHeap.getMin());
              AsyncLogPrinter.done();
            }
          })
        );
      };

      // foldLogs(asyncLogSources);

      require("./solution/async-sorted-merge")(asyncLogSources, new Printer())
        .then(resolve)
        .catch(reject);
    });
  });
}

// Adjust this input to see how your solutions perform under various loads.
runSolutions(100000);
