import { BinaryTypes, BufferReader, BufferSchema, BufferWriter, SchemaCollection } from "./BinaryUtils";

// Create a Schema that will be used to pull data out of the buffer
const schema1 = new BufferSchema(
    [BinaryTypes.u8, BinaryTypes.u16, BinaryTypes.str],
    {
        errorMessage: "Schema1 validation failed!"
    });

const schema2 = new BufferSchema(
    [BinaryTypes.u8, BinaryTypes.u16, BinaryTypes.str],
    {
        errorMessage: "Schema2 validation failed!"
    });

const schemaCollection = new SchemaCollection([schema1, schema2]);

// Create a buffer writer to writer data into a buffer
const bufWriter = new BufferWriter();
bufWriter.writeU8(123)
bufWriter.writeU16(1234)
bufWriter.writeString("Hello world!");

bufWriter.writeU8(42)
bufWriter.writeU16(5023)
bufWriter.writeString("World hello!");

// get the raw buffer from the BufferWriter
const bytes = bufWriter.getBytes();

// Load the buffer into the BufferReader
const bufReader = new BufferReader();
bufReader.readFrom(bytes);

// Validate the buffer against the schema
try {
    schema1.validate(bufReader);
    schemaCollection.validate(bufReader);
} catch (err) {
    // Do something with the error
    console.log("Error validating Buffer schema: " + err);
}

// read the data from the schema...
const [firstVal, secondVal, thirdVal] = schema1.readData(bufReader);
const [fourthVal, fithVal, sixthVal] = schema2.readData(bufReader);

console.log("reading schema1,", firstVal, secondVal, thirdVal);
console.log("reading schmea2,", fourthVal, fithVal, sixthVal);


