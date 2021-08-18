const FORMAT_INDEX_SIZE = 8;

const formatUnique = (year, index: string) => {
  return `${year}${index.toString().padStart(FORMAT_INDEX_SIZE, "0")}`;
};

export default class OrderCode {
  value: string;
  constructor(date: Date, sequence: number) {
    this.value = formatUnique(date.getFullYear(), `${sequence}`);
  }
}
