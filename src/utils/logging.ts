export const logAnswer = (answer: any, day: number, part: number) => {
  process.stdout.write(`\n\n-----------------------------------
Answer Day ${day} Part ${part}: ${answer}
-----------------------------------\n\n`);
};

export const log = (...args: any[]) => {
  process.stdout.write(`${args.join(', ')}\n\n`);
};
