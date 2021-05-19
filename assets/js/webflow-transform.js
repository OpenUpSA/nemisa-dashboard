function transformDOM(window, $) {
  const tag = window.document.createElement('script');
  const title = $('title').text();
  let jsFile;
  // TODO: make this less ugly
  switch (title) {
    case 'Survey':
      jsFile = 'js/survey/individual_form.js';
      break;
    case 'Industry Digital Skills Survey':
      jsFile = 'js/survey/industry_form.js';
      break;
    case 'Individual Results':
      jsFile = 'js/dashboard/dashboard.js';
      break;
    default:
      break;
  }
  tag.setAttribute('src', jsFile);
  window.document.body.appendChild(tag);
}

exports.transformDOM = transformDOM;
