// Just a basic example for size limit with simple file preset
// @link https://github.com/ai/size-limit

let manifest
try {
  manifest = require('./.next/build-manifest.json')
} catch (e) {
  throw new Error(
    'Cannot find a NextJs build folder, did you forget to build ?'
  )
}
const pages = manifest.pages

const limitCfg = {
  defaultSize: '150kb',
  pages: {
    '/': '150kb',
    '/404': '150kb',
    '/_app': '180kb',
    '/_error': '140kb',
    '/_monitor/sentry/csr-page': '105kb',
    '/_monitor/sentry/ssr-page': '105kb',
    '/_monitor/preview/error-page': '105kb',
    '/auth/login': '160kb',
    '/home': '120kb',
  },
}

const getPageLimits = () => {
  let pageLimits = []
  for (const [uri, paths] of Object.entries(pages)) {
    pageLimits.push({
      name: `Page '${uri}'`,
      limit: limitCfg.pages?.[uri] ?? limitCfg.defaultSize,
      path: paths.map(p => `.next/${p}`),
    })
  }
  return pageLimits
}

module.exports = [
  ...getPageLimits(),
  {
    name: 'CSS',
    path: ['./.next/static/css/**/*.css'],
    limit: '15 kB',
  },
]
