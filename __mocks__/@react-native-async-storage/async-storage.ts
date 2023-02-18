// somewhere in your configuration files
import AsyncStorageMock from '@react-native-async-storage/async-storage/jest/async-storage-mock';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
AsyncStorageMock.multiGet = jest.fn(([keys], callback) => {
  // do something here to retrieve data
  callback([]);
});

export default AsyncStorageMock;
