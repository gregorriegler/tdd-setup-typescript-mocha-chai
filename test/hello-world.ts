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

        enum Direction {
            Reverse = 1
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

        function endOfSentence(char: string) {
            return char == '.';
        }

        function endOfWord(char: string) {
            return endOfSentence(char) || char == ' ';
        }

        function word(input: Input, output: Output, direction: Direction, depth: number): string {
            let char = input.read()

            if (endOfWord(char)) {
                if (depth == 0) return ''
                return char;
            }

            if (direction == Direction.Reverse) {
                let finalChar: string = word(input, output, direction, ++depth);
                output.write(char)
                return finalChar
            }

            output.write(char)
            return word(input, output, direction, ++depth)
        }

        function oddWords(text: string) {
            let input = createInput(text)
            let output = createOutput()

            for (let i = 0, char = ''; !endOfSentence(char);) {
                char = word(input, output, i % 2, 0);

                if (char != '') {
                    i++
                    output.write(char)
                }

            }

            return output.get()
        }

        expect(oddWords("ab.")).to.equal("ab.")
        expect(oddWords("abc cde.")).to.equal("abc edc.")
        expect(oddWords("abc   cde.")).to.equal("abc edc.")
    });
});