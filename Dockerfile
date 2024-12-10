FROM node:lts

RUN npm install -g pnpm

WORKDIR /usr/src/app

COPY package.json pnpm-lock.yaml ./

RUN pnpm install --frozen-lockfile

RUN git submodule update --init --recursive

COPY . .

RUN pnpm run dev

EXPOSE 3000

CMD ["pnpm", "run", "start"]
