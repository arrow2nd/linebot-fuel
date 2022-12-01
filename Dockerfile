FROM denoland/deno:1.10.3

ENV PORT 8080

WORKDIR /app

USER deno

COPY . .

CMD ["task", "start"]
