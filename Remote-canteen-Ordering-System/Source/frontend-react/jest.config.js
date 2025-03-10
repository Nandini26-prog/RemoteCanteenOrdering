module.exports = {
    transformIgnorePatterns: [
      "node_modules/(?!axios)" // ✅ `axios` module ko transform hone do
    ],
    transform: {
      "^.+\\.(js|jsx|ts|tsx)$": "babel-jest", // ✅ Jest ko Babel se transpile karne do
    },
  };
  