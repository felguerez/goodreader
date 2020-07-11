export function index(req, res) {
  res.send("こんにちは!");
}

export function test(req, res) {
  res.send("working");
}

export async function items(req, res) {
  const items = await pgClient.query("SELECT * FROM items");
  res.send(JSON.stringify(items.rows));
}
