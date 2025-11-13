//goal is to explain why typeof works the way it does in javascript
export function TypeOfExplained() {
    return (
        <div className="text-white pl-1 text-sm bg-black">
            <h1>TypeOf Explanation</h1>
            <p>
                In JavaScript, the typeof operator is used to determine the type of a given value. It returns a string indicating the type of the unevaluated operand.
            </p>
            <p>
                The possible return values of typeof are:
                <ul className="pl-1">
                    <li>"undefined" - for undefined values</li>
                    <li>"boolean" - for true and false</li>
                    <li>"number" - for numeric values (including NaN and Infinity)</li>
                    <li>"string" - for string values</li>
                    <li>"object" - for objects, arrays, and null</li>
                    <li>"function" - for functions</li>
                    <li>"symbol" - for symbol values (ES6 and later)</li>
                    <li>"bigint" - for BigInt values (ES2020 and later)</li>
                </ul>
            </p>
            <p>
                Note that typeof has some quirks, such as returning "object" for null values, which is a historical bug in JavaScript.
            </p>

            <p>Comes in handy when you want to check the type of a variable or value before performing operations on it.</p>
            <p>Which would help prevent errors and ensure your code behaves as expected.</p>
        </div>
    )
}