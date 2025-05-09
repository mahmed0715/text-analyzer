import NodeCache from "node-cache";
const cache = new NodeCache({ stdTTL: 300 }); // cache expires in 5 minutes
export default cache;
