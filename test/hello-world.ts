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

        function reverseWord(input: Input, output: Output): string {
            let char = input.read()

            if (char == '.' || char == ' ') {
                return char;
            }
            let finalChar: string = reverseWord(input, output);
            output.write(char)
            return finalChar
        }

        function straightWord(input: Input, output: Output): string {
            let char = input.read()

            if (char == '.' || char == ' ') {
                return char;
            }
            output.write(char)
            return straightWord(input, output)
        }

        function oddWords(text: string) {
            let input = createInput(text)
            let output = createOutput()

            for (let i = 0, char = ''; char != '.'; i++) {
                if (i % 2 == 1) {
                    char = reverseWord(input, output);
                } else {
                    char = straightWord(input, output);
                }
                output.write(char)
            }

            return output.get()
        }

        expect(oddWords("ab cd.")).to.equal("ab dc.")
        expect(oddWords("ab.")).to.equal("ab.")
    });
});