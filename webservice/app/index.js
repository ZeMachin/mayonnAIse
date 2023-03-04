import db from "./db.js";

// The root provides a resolver function for each API endpoint
const root = {
  whatsmyname: db.whatsmyname,
  whatamI: db.whatami
};

export {
  root
}