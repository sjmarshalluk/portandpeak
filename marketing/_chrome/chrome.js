(function () {
  const configEl = document.getElementById('pp-chrome-config');
  if (!configEl) {
    console.error('Port & Peak chrome: missing <script id="pp-chrome-config">');
    return;
  }

  let config;
  try {
    config = JSON.parse(configEl.textContent);
  } catch (e) {
    console.error('Port & Peak chrome: invalid JSON config', e);
    return;
  }

  const designs = Array.isArray(config.designs) ? config.designs : [];
  if (!designs.length) {
    console.error('Port & Peak chrome: config.designs is empty');
    return;
  }

  const header = document.createElement('header');
  header.className = 'pp-chrome-header';

  const brand = document.createElement('a');
  brand.href = 'https://portandpeak.co';
  brand.className = 'pp-brand';
  brand.textContent = 'Port & Peak';

  const designBar = document.createElement('nav');
  designBar.className = 'pp-design-bar';
  designBar.setAttribute('aria-label', 'Switch design');

  const stamp = document.createElement('span');
  stamp.className = 'pp-stamp';
  stamp.textContent = 'Concept · ' + (config.client || '');

  header.appendChild(brand);
  header.appendChild(designBar);
  header.appendChild(stamp);

  const frameWrap = document.createElement('div');
  frameWrap.className = 'pp-frame';
  const iframe = document.createElement('iframe');
  iframe.title = (config.client || 'Concept') + ' preview';
  iframe.loading = 'lazy';
  frameWrap.appendChild(iframe);

  document.body.appendChild(header);
  document.body.appendChild(frameWrap);

  const buttons = designs.map(function (d, i) {
    const btn = document.createElement('button');
    btn.className = 'pp-design-btn';
    btn.type = 'button';
    btn.textContent = d.name;
    btn.addEventListener('click', function () { switchTo(i); });
    designBar.appendChild(btn);
    return btn;
  });

  function switchTo(i) {
    iframe.src = designs[i].url;
    buttons.forEach(function (btn, idx) {
      btn.classList.toggle('active', idx === i);
    });
  }

  switchTo(0);
})();
