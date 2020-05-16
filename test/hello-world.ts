import {expect} from "chai";

describe('oddWords', function () {
    it('world', function () {
        type Input = {
            read: () => string
        }

        type Output = {
            write: (char: string) => void
            get: () => string;
        }

        function createInput(text: string): Input {
            let index = 0
            return {
                read: (): string => {
                    return text.charAt(index++)
                }
            }
        }

        function createOutput(): Output {
            let text: string = ""
            return {
                write: (char: string) => {
                    text += char
                },
                get: (): string => {
                    return text
                }
            }
        }

        function recursive(input: Input, output: Output): string {
            let char = input.read()

            if (char == '.') {
                return char;
            }
            let finalChar:string = recursive(input, output);
            output.write(char)
            return finalChar
        }

        function oddWords(text: string) {
            let input = createInput(text)

            let output = createOutput()

            let finalChar = recursive(input, output);
            output.write(finalChar)
            return output.get()
        }

        expect(oddWords("ab.")).to.equal("ba.")
    });
});