export interface IMongoStore {
  uri: string;
  useNewUrlParser: boolean;
  useCreateIndex: boolean;
  autoCreate: boolean;
  useUnifiedTopology: boolean;
  useFindAndModify: boolean;
}
