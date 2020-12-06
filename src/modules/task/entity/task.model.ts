import { Schema, Document, model } from 'mongoose';

export interface ITask extends Document {
  text: string;
  author: string;
}

// transform for sending as json
function omitPrivate(_doc: Document, obj: ITask) {
  delete obj.__v;
  return obj;
}

const TaskSchema: Schema = new Schema(
  {
    text: { type: String, required: true },
    author: { type: String, required: true },
  },
  {
    timestamps: true,
    toJSON: {
      transform: omitPrivate,
    },
  },
);

export default model<ITask>('Task', TaskSchema);
