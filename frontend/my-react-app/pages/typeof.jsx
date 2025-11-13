import React, { useState,} from "react";
import {Explanation} from "../components/explanation.jsx";
import {TypeOfExplained} from "../pages/why/typeof.jsx";
export function TypeOf() {
    const [value, setValue] = useState("");
    const [code, viewCode] = useState(false);
    // turn the text into a JS value
    const parseData = (value) => {
        //can be a string, number, boolean, null or undefined
        const parse = String(value).trim();

        //global flags include i - ignore case, g - global, m - multiline, s - dotall, u - unicode, y - sticky
        //example for global: /pattern/g which finds all matches instead of stopping after the first match
        //example for ignore case: /pattern/i which makes the pattern case-insensitive so /pattern/i matches "Pattern", "PATTERN", "pAtTeRn", etc.
        //example for multiline: /pattern/m which changes the behavior of ^ and $ to match the start and end of each line within a string, not just the start and end of the entire string
        //example for dotall: /pattern/s which allows the dot (.) to match newline characters as well
        //example for unicode: /pattern/u which enables full Unicode support, allowing for matching of Unicode characters and properties
        //example for sticky: /pattern/y which matches only from the lastIndex position in the target string
        if (parse === "") return ""; //empty string
        if(/^null$/i.test(parse)) return null; //null
        if(/^undefined$/i.test(parse)) return undefined; //undefined

        //dealing with booleans, needs to be explicit true/false as in (/pattern/i) match exactly from beginning to end
        if (/^(true|1|on|yes)$/i.test(parse)) return true; //boolean true
        if (/^(false|0|off|no)$/i.test(parse)) return false; //boolean false

        //dealing with numbers
        const number = Number(parse);
        if (!Number.isNaN(number)) return number; //valid number

        //dealing with objects and arrays
        
        if (/^[\[{]/.test(parse)) { //if value starts with -> [{"Test": 1}] or [{1,2,3}] or {key: "value"}
            try {return JSON.parse(parse);} catch (e) { /* invalid JSON, fall through to string */ }
        }

        //dealing with functions Im not sure
        //dealing with symbols?????!???!??
        //DEALING WTIH big Ints??????????????

        
        return parse; //string aka fallback
    }

    //call it once per render
    const parsedData = parseData(value);

    const determineType = (v) => {
        //determine the type of the value
        //we can have null, undefined, array, object, string, number, boolean, function
        if (v === null) return "null";
        if (Array.isArray(v)) return "array";
        if (Number.isNaN(v)) return "NaN";
        switch (typeof v) {
            case "string":
                return "string";
            case "number":
                return "number";
            case "boolean":
                return "boolean";
            case "undefined":
                return "undefined";
            case "object":
                return "object";
            case "function":
                return "function";
            default:
                return "unknown";
        }
 

    };

    const handleButtonClick = () => {
        viewCode(!code);
    }

    return (
        <>
        <div className="bg-amber-200 m-4 rounded-lg border-2">
            <h1 className="text-2xl font-bold text-center border-b-2 pb-1">TypeOf</h1>

            <label className="block mb-2 text-center font-bold mx-auto">
                <p className="underline ">Enter a value</p>
                <input
                    className="p-1 border border-gray-300 rounded flex bg-white mx-auto"
                    value={value}
                    onChange={(e) => setValue(e.target.value)}
                    placeholder='hello, true, 1, 2, null , etc.'
                />
            </label>

            <div className="ml-10">
                <div>Type: <b>{determineType(parsedData)}</b></div>
                <div>Value: <b>{typeof parsedData === "string" ? `"${parsedData}"` : String(parsedData)}</b></div>
                <div>Without parsing: <b>{value}</b></div>
            </div>
            <div className="mx-10"><Explanation children="This component determines the type of the input value and displays it along with the value itself." /></div>
        <TypeOfExplained/>
        </div>
        </>
    );
}
