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

        function recursive(input: Input, output: Output) {
            let char = input.read()

            if (char != '.') {
                recursive(input, output);
                output.write(char)
            }
        }

        function oddWords(text: string) {
            let input = createInput(text)

            let output = createOutput()

            recursive(input, output);
            output.write(".")
            return output.get()
        }

        expect(oddWords("ab.")).to.equal("ba.")
    });
});