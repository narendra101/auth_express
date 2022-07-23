import mongoose  from "mongoose"

const connectDB = async DB_URI => {
    try {
       await mongoose.connect(DB_URI, {useNewUrlParser: true}) 
       console.log(`connected to ${DB_URI}`)
    } catch (error) {
        console.log(`exception: ${error.message}`)
    }
}

export default connectDB