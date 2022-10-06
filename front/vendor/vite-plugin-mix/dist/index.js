'use strict'
const fs = require('fs')
const path = require('path')
const colors = require('picocolors')
const vite = require('vite')
const http = require('http')
const http2 = require('http2')
const require$$0$1 = require('querystring')
const { setImmediate } = require('timers/promises')

Object.defineProperty(exports, '__esModule', { value: true })

function _interopDefaultLegacy(e) {
  return e && typeof e === 'object' && 'default' in e ? e : { default: e }
}

const fs__default = /*#__PURE__*/ _interopDefaultLegacy(fs)
const path__default = /*#__PURE__*/ _interopDefaultLegacy(path)
const http__default = /*#__PURE__*/ _interopDefaultLegacy(http)
const require$$0__default = /*#__PURE__*/ _interopDefaultLegacy(require$$0$1)

function every(arr, cb) {
  let i = 0
  const len = arr.length

  for (; i < len; i++) {
    if (!cb(arr[i], i, arr)) {
      return false
    }
  }

  return true
}

const SEP$1 = '/'
// Types ~> static, param, any, optional
const STYPE = 0
const PTYPE = 1
const ATYPE = 2
const OTYPE = 3
// Char Codes ~> / : *
const SLASH = 47
const COLON = 58
const ASTER = 42
const QMARK = 63

function strip(str) {
  if (str === SEP$1) return str
  str.charCodeAt(0) === SLASH && (str = str.substring(1))
  const len = str.length - 1
  return str.charCodeAt(len) === SLASH ? str.substring(0, len) : str
}

function split(str) {
  return (str = strip(str)) === SEP$1 ? [SEP$1] : str.split(SEP$1)
}

function isMatch(arr, obj, idx) {
  idx = arr[idx]
  return (
    (obj.val === idx && obj.type === STYPE) ||
    (idx === SEP$1
      ? obj.type > PTYPE
      : obj.type !== STYPE && (idx || '').endsWith(obj.end))
  )
}

function match$1(str, all) {
  let tmp, l
  const segs = split(str)
  const len = segs.length
  const fn = isMatch.bind(isMatch, segs)

  for (let i = 0; i < all.length; i++) {
    tmp = all[i]
    if (
      (l = tmp.length) === len ||
      (l < len && tmp[l - 1].type === ATYPE) ||
      (l > len && tmp[l - 1].type === OTYPE)
    ) {
      if (every(tmp, fn)) return tmp
    }
  }

  return []
}

function parse$2(str) {
  if (str === SEP$1) {
    return [{ old: str, type: STYPE, val: str, end: '' }]
  }

  let c, x, t, sfx
  let nxt = strip(str)
  let i = -1
  let j = 0
  let len = nxt.length
  const out = []

  while (++i < len) {
    c = nxt.charCodeAt(i)

    if (c === COLON) {
      j = i + 1 // begining of param
      t = PTYPE // set type
      x = 0 // reset mark
      sfx = ''

      while (i < len && nxt.charCodeAt(i) !== SLASH) {
        c = nxt.charCodeAt(i)
        if (c === QMARK) {
          x = i
          t = OTYPE
        } else if (c === 46 && sfx.length === 0) {
          sfx = nxt.substring((x = i))
        }
        i++ // move on
      }

      out.push({
        old: str,
        type: t,
        val: nxt.substring(j, x || i),
        end: sfx,
      })

      // shorten string & update pointers
      nxt = nxt.substring(i)
      len -= i
      i = 0

      continue // loop
    } else if (c === ASTER) {
      out.push({
        old: str,
        type: ATYPE,
        val: nxt.substring(i),
        end: '',
      })
      continue // loop
    } else {
      j = i
      while (i < len && nxt.charCodeAt(i) !== SLASH) {
        ++i // skip to next slash
      }
      out.push({
        old: str,
        type: STYPE,
        val: nxt.substring(j, i),
        end: '',
      })
      // shorten string & update pointers
      nxt = nxt.substring(i)
      len -= i
      i = j = 0
    }
  }

  return out
}

function exec$1(str, arr) {
  let i = 0
  let x, y
  const segs = split(str)
  const out = {}
  for (; i < arr.length; i++) {
    x = segs[i]
    y = arr[i]
    if (x === SEP$1) continue
    if (x !== void 0 && y.type | (2 === OTYPE)) {
      out[y.val] = x.replace(y.end, '')
    }
  }
  return out
}

const matchit = /*#__PURE__*/ Object.freeze({
  __proto__: null,
  match: match$1,
  parse: parse$2,
  exec: exec$1,
})

function getAugmentedNamespace(n) {
  if (n.__esModule) return n
  const a = Object.defineProperty({}, '__esModule', { value: true })
  Object.keys(n).forEach(function (k) {
    const d = Object.getOwnPropertyDescriptor(n, k)
    Object.defineProperty(
      a,
      k,
      d.get
        ? d
        : {
            enumerable: true,
            get: function () {
              return n[k]
            },
          }
    )
  })
  return a
}

const require$$0 = /*@__PURE__*/ getAugmentedNamespace(matchit)

const { exec, match, parse: parse$1 } = require$$0

class Trouter {
  constructor(opts) {
    this.opts = opts || {}
    this.routes = {}
    this.handlers = {}

    this.all = this.add.bind(this, '*')
    this.get = this.add.bind(this, 'GET')
    this.head = this.add.bind(this, 'HEAD')
    this.patch = this.add.bind(this, 'PATCH')
    this.options = this.add.bind(this, 'OPTIONS')
    this.connect = this.add.bind(this, 'CONNECT')
    this.delete = this.add.bind(this, 'DELETE')
    this.trace = this.add.bind(this, 'TRACE')
    this.post = this.add.bind(this, 'POST')
    this.put = this.add.bind(this, 'PUT')
  }

  add(method, pattern, ...fns) {
    // Save decoded pattern info
    if (this.routes[method] === void 0) this.routes[method] = []
    this.routes[method].push(parse$1(pattern))
    // Save route handler(s)
    if (this.handlers[method] === void 0) this.handlers[method] = {}
    this.handlers[method][pattern] = fns
    // Allow chainable
    return this
  }

  find(method, url) {
    let arr = match(url, this.routes[method] || [])
    if (arr.length === 0) {
      arr = match(url, this.routes[(method = '*')] || [])
      if (!arr.length) return false
    }
    return {
      params: exec(url, arr),
      handlers: this.handlers[method][arr[0].old],
    }
  }
}

const trouter = Trouter

const url = function (req) {
  const url = req.url
  if (url === void 0) return url

  let obj = req._parsedUrl
  if (obj && obj._raw === url) return obj

  obj = {}
  obj.query = obj.search = null
  obj.href = obj.path = obj.pathname = url

  const idx = url.indexOf('?', 1)
  if (idx !== -1) {
    obj.search = url.substring(idx)
    obj.query = obj.search.substring(1)
    obj.pathname = url.substring(0, idx)
  }

  obj._raw = url

  return (req._parsedUrl = obj)
}

const { parse } = require$$0__default['default']

function lead(x) {
  return x.charCodeAt(0) === 47 ? x : '/' + x
}

function value(x) {
  const y = x.indexOf('/', 1)
  return y > 1 ? x.substring(0, y) : x
}

function mutate(str, req) {
  req.url = req.url.substring(str.length) || '/'
  req.path = req.path.substring(str.length) || '/'
}

function onError(err, req, res) {
  const code = (res.statusCode = err.code || err.status || 500)
  res.end(
    (err.length && err) ||
      err.message ||
      http__default['default'].STATUS_CODES[code]
  )
}

class Polka extends trouter {
  constructor(opts = {}) {
    super(opts)
    this.apps = {}
    this.wares = []
    this.bwares = {}
    this.parse = url
    this.server = opts.server
    this.handler = this.handler.bind(this)
    this.onError = opts.onError || onError // catch-all handler
    this.onNoMatch = opts.onNoMatch || this.onError.bind(null, { code: 404 })
  }

  add(method, pattern, ...fns) {
    const base = lead(value(pattern))
    if (this.apps[base] !== void 0)
      throw new Error(
        `Cannot mount ".${method.toLowerCase()}('${lead(
          pattern
        )}')" because a Polka application at ".use('${base}')" already exists! You should move this handler into your Polka application instead.`
      )
    return super.add(method, pattern, ...fns)
  }

  use(base, ...fns) {
    if (typeof base === 'function') {
      this.wares = this.wares.concat(base, fns)
    } else if (base === '/') {
      this.wares = this.wares.concat(fns)
    } else {
      base = lead(base)
      fns.forEach((fn) => {
        if (fn instanceof Polka) {
          this.apps[base] = fn
        } else {
          const arr = this.bwares[base] || []
          arr.length > 0 || arr.push((r, _, nxt) => (mutate(base, r), nxt()))
          this.bwares[base] = arr.concat(fn)
        }
      })
    }
    return this // chainable
  }

  listen(...args) {
    this.server = this.server || http__default['default'].createServer()
    this.server.on('request', this.handler)
    this.server.listen(...args)
    return this
  }

  handler(req, res, info) {
    info = info || this.parse(req)
    let fns = []
    let arr = this.wares
    const obj = this.find(req.method, info.pathname)
    req.originalUrl = req.originalUrl || req.url
    const base = value((req.path = info.pathname))
    if (this.bwares[base] !== void 0) {
      arr = arr.concat(this.bwares[base])
    }
    if (obj) {
      fns = obj.handlers
      req.params = obj.params
    } else if (this.apps[base] !== void 0) {
      mutate(base, req)
      info.pathname = req.path //=> updates
      fns.push(this.apps[base].handler.bind(null, req, res, info))
    } else if (fns.length === 0) {
      fns.push(this.onNoMatch)
    }
    // Grab addl values from `info`
    req.search = info.search
    req.query = parse(info.query)
    // Exit if only a single function
    let i = 0
    let len = arr.length
    const num = fns.length
    if (len === i && num === 1) return fns[0](req, res)
    // Otherwise loop thru all middlware
    const next = (err) => (err ? this.onError(err, req, res, next) : loop())
    const loop = () => res.finished || (i < len && arr[i++](req, res, next))
    arr = arr.concat(fns)
    len += num
    loop() // init
  }
}

const polka = (opts) => new Polka(opts)

function getStack(error) {
  return error.stack
    .split('\n')
    .slice(error.message.split('\n').length)
    .join('\n')
}
function sendApiError(server, error) {
  if (!error) return server.ws.send({ type: 'error' })
  const { message, frame } = error
  server.ws.send({
    type: 'error',
    err: { message: `Api server: ${message}`, stack: getStack(error), frame },
  })
}
function displayApiError(server, error) {
  server.config.logger.error(colors.red(`Api server: ${error.message}`), {
    clear: true,
    timestamp: true,
    error,
  })
  console.log(colors.dim(getStack(error)))
}
function displayApiInfo(server, message) {
  server.config.logger.info(colors.green(`Api server: ${message}`), {
    clear: true,
    timestamp: true,
  })
}

const index = ({ handler, server, buildTo = 'build' }) => {
  let root = process.cwd()
  let clientOutDir, old_endpoint

  const getHandlerFile = () => path__default['default'].resolve(root, handler)
  const getServerFile = () => path__default['default'].resolve(root, server)
  return {
    name: 'mix',

    configResolved(config) {
      root = config.root
      clientOutDir = path__default['default'].resolve(root, config.build.outDir)
    },
    async handleHotUpdate({ server, modules }) {
      const handlerFile = getHandlerFile()
      displayApiInfo(server, 'reloading')
      const endpoint = await server
        .ssrLoadModule(`/@fs/${handlerFile}`)
        .then((handler) => {
          sendApiError(server)
          displayApiInfo(server, 'reloaded')
          return handler
        })
        .catch((err) => {
          server.ssrFixStacktrace(err)
          sendApiError(server, err)
          displayApiError(server, err)
          return err
        })
      if (endpoint === old_endpoint) return modules
      old_endpoint = endpoint
      return []
    },
    configureServer(devServer) {
      const handlerFile = getHandlerFile()

      devServer.middlewares.use(async (req, res, next) => {
        try {
          const mod = await devServer
            .ssrLoadModule(`/@fs/${handlerFile}`)
            .catch((err) => {
              sendApiError(devServer, err)
              return { handler: [], secure_handler: [] }
            })
          const server = polka({ onNoMatch: () => next() })
          server.use((req, res, next) => {
            // @ts-expect-error necessity
            req.viteServer = devServer
            next()
          })
          if (Array.isArray(mod.handler)) {
            mod.handler.forEach((handler) => server.use(handler))
          } else {
            server.use(mod.handler)
          }
          server.handler(req, res)
        } catch (error) {
          devServer.ssrFixStacktrace(error)
          next(error)
        }
      })
      return async () => {
        await setImmediate()
        console.log()
        displayApiInfo(devServer, 'loading')
        devServer
          .ssrLoadModule(`/@fs/${handlerFile}`)
          .then(() => displayApiInfo(devServer, 'loaded'))
          .catch((err) => {
            devServer.ssrFixStacktrace(err)
            sendApiError(devServer, err)
            displayApiError(devServer, err)
          })
      }
    },
    /*
    configureServer(devServer) {
      devServer.middlewares.use(async (req, res, next) => {
        try {
          const mod = await devServer
            .ssrLoadModule(`/@fs/${handlerFile}`)
            .catch((err) => {
              sendApiError(devServer, err)
              return { handler: [] }
            })
          const server = polka({ onNoMatch: () => next() })
          server.use((req, res, next) => {
            // @ts-expect-error necessity
            req.viteServer = devServer
            next()
          })
          if (Array.isArray(mod.handler)) {
            mod.handler.forEach((handler) => server.use(handler))
          } else {
            server.use(mod.handler)
          }
          server.handler(req, res)
        } catch (error) {
          devServer.ssrFixStacktrace(error)
          process.exitCode = 1
          next(error)
        }
      })
    },
    */

    async writeBundle() {
      if (process.env.MIX_SSR_BUILD) return

      process.env.MIX_SSR_BUILD = 'true'

      const serverOutDir = path__default['default'].resolve(root, buildTo)

      const handlerFile = getHandlerFile()
      const serverFile = getServerFile()

      const indexHtmlPath = path__default['default'].join(
        clientOutDir,
        'index.html'
      )
      const indexHtml = fs__default['default'].readFileSync(
        indexHtmlPath,
        'utf8'
      )
      fs__default['default'].unlinkSync(indexHtmlPath)

      await vite.build({
        root,
        resolve: {
          alias: {
            $handler_file: handlerFile,
          },
        },
        define: {
          'import.meta.env.MIX_CLIENT_DIR': JSON.stringify(
            path__default['default'].relative(process.cwd(), clientOutDir)
          ),
          'import.meta.env.MIX_HTML': JSON.stringify(indexHtml),
        },
        build: {
          outDir: serverOutDir,
          emptyOutDir: true,
          ssr: true,
          rollupOptions: {
            input: {
              handler: handlerFile,
              server: serverFile,
            },
          },
        },
      })
    },
  }
}

exports.default = index
