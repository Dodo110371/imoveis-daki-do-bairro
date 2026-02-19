const puppeteer = require('puppeteer');

async function capture(urlPath, outPath, page) {
  const url = `http://localhost:3000${urlPath}`;
  try {
    await page.goto(url, { waitUntil: 'networkidle2', timeout: 60000 });
    await page.waitForTimeout(1500);
    await page.screenshot({ path: outPath, fullPage: true });
    console.log(`OK: ${urlPath} -> ${outPath}`);
  } catch (err) {
    console.error(`FAIL: ${urlPath} -> ${outPath}`, err.message);
  }
}

async function main() {
  const browser = await puppeteer.launch({
    headless: 'new',
    defaultViewport: { width: 1366, height: 900 },
    args: ['--no-sandbox', '--disable-setuid-sandbox'],
  });
  const page = await browser.newPage();

  const tasks = [
    { path: '/', out: 'archive/manual/img/home.png' },
    { path: '/cadastro', out: 'archive/manual/img/login.png' },
    { path: '/minha-conta', out: 'archive/manual/img/minha-conta.png' },
    { path: '/anunciar', out: 'archive/manual/img/anunciar.png' },
    { path: '/imoveis', out: 'archive/manual/img/galeria.png' },
    { path: '/comprar', out: 'archive/manual/img/filtros.png' },
    { path: '/comparar', out: 'archive/manual/img/comparar.png' },
    { path: '/planos', out: 'archive/manual/img/planos.png' },
    { path: '/admin', out: 'archive/manual/img/admin.png' },
  ];

  for (const t of tasks) {
    await capture(t.path, t.out, page);
  }

  await browser.close();
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
