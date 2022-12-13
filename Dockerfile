FROM denoland/deno:1.28.3

ENV PORT 8080
EXPOSE 8080

USER deno
WORKDIR /app

COPY --chown=deno:deno . .
RUN deno cache server.ts

CMD ["task", "start"]
