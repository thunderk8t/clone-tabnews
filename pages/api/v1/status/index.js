import database from "infra/database.js";

async function status(request, response) {
  const updatedAt = new Date().toISOString();
  const pg_version = await database.query("SELECT version();");
  const all_configs = await database.query("SHOW max_connections;");
  const dbName = process.env.POSTGRES_DB;
  const all_pg_stat_activity = await database.query({
    text: "SELECT count(*)::int FROM pg_stat_activity WHERE datname = $1;",
    values: [dbName],
  });
  const postgres_version = pg_version.rows[0].version.substring(11, 15);
  const max_connections = parseInt(all_configs.rows[0].max_connections);
  const used_connections = all_pg_stat_activity.rows[0].count;

  response.status(200).json({
    updated_at: updatedAt,
    dependencies: {
      database: {
        postgres_version: postgres_version,
        max_connections: max_connections,
        used_connections: used_connections,
      },
    },
  });
}

export default status;
