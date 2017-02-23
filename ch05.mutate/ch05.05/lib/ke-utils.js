module.exports = {

  p(text) {
    document.write("<p>" + text + "</p>");
  },

  t(text) {
    document.write(text);
  },

  wval(desc, value) {
    document.write("<p><b>" + desc + " =</b> " + value + "</p>");
  },

  h1(text) {
    this.whead(text, 1);
  },

  h2(text) {
    this.whead(text, 2);
  },

  h3(text) {
    this.whead(text, 3);
  },

  h4(text) {
    this.whead(text, 4);
  },

  whead(text, level) {
    let val = level ? level : 1;
    let h = document.createElement("h" + val);
    let t = document.createTextNode(text);
    h.appendChild(t);
    document.body.appendChild(h);
  },

  code(text) {
    const str = "<code>" + text + "</code>";
    document.write(str);
  },

  pre(text) {
    let str;
    str = "<pre>" + text + "</pre>";
    document.write(str);
  },

  log(name, value = '', color = 'normal') {
    console.log(value);
    let logIt;
    if (typeof value === 'object') {
      if (value.hasOwnProperty('type')) {
        if (!value.type.substring(0, 2) === '@@') {
          console.log('logIt', true);
          logIt = true;
        } else {
          console.log('logIt', false);
          logIt = false;
        }
      }
    }
    if (logIt) {
      switch (color) {
        case 'red':
          color = 'red';
          break;
        default:
          color = '#ADD8E6';
      }
      let message = `%c[LOG] ${name}`;
      let colorString = `background: #222; color: ${color}`;
      // console.log(message, colorString, value);
    }
  },

  logFunction(name) {
    // console.log("%c[FUN] " + name + "()", "background: #222; color: green");
  },
};
