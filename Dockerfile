FROM denoland/deno:1.28.3

EXPOSE 8080

USER deno
WORKDIR /app

COPY --chown=deno:deno . .
RUN deno cache server.ts

CMD ["task", "run"]
