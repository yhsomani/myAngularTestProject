// models/Employee.js
const mongoose = require('mongoose');
const { Schema } = mongoose;

const employeeSchema = new Schema(
    {
        name: {
            type: String,
            required: [true, 'Name is required'],
            trim: true,
            minlength: [2, 'Name must be at least 2 characters long'],
            maxlength: [50, 'Name cannot exceed 50 characters']
        },
        email: {
            type: String,
            required: [true, 'Email is required'],
            unique: true,
            lowercase: true,
            trim: true,
            validate: {
                validator: function (v) {
                    return /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(v);
                },
                message: props => `${props.value} is not a valid email address!`
            }
        },
        designation: {
            type: String,
            required: [true, 'Designation is required'],
            trim: true,
            minlength: [2, 'Designation must be at least 2 characters long'],
            maxlength: [100, 'Designation cannot exceed 100 characters']
        },
        phoneNumber: {
            type: String,
            required: [true, 'Phone number is required'],
            validate: {
                validator: function (v) {
                    return /^\+?[\d\s-]{10,}$/.test(v);
                },
                message: props => `${props.value} is not a valid phone number!`
            }
        },
        active: {
            type: Boolean,
            default: true
        }
    },
    {
        collection: 'employees1',
        timestamps: true,
        toJSON: {
            transform: function (doc, ret) {
                ret.id = ret._id;
                delete ret._id;
                delete ret.__v;
                return ret;
            }
        }
    });

module.exports = mongoose.model('Employee', employeeSchema);
