
export default function logger(req, res, next) {

    console.log(`Incoming request ${req.method} for url ${req.url}`)

    // ! Tell it we're done.
    next()
}