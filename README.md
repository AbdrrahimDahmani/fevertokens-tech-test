This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Installing and running the app

First, clone the project and install the dependencies:

```bash
git clone https://github.com/AbdrrahimDahmani/fevertokens-tech-test.git

cd fevertokens-tech-test

pnpm  install
```

Copy the data inside the .env.exemple into .env.local and build the project

```bash
pnpm run build
```

then run the development server:

```bash
pnpm run dev --port=8000
```

Open [http://localhost:8000](http://localhost:8000) with your browser to see the result.

## Notice

Sometimes a CORS error occurs when you try to fetch the data from the "/coins/\${id}/market_chart?vs_currency=usd&days=7" endpoint. If you encounter this error, you can try refreshing the page and waiting for it to resolve. Alternatively, you can install the [CORS Unblock](https://chromewebstore.google.com/detail/cors-unblock/lfhmikememgdcahcdlaciloancbhjino) Chrome extension to bypass the error.
