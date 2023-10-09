// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

export default function handler(req, res) {
//   res.status(200).json({ name: "John Doe" });



//  {
//     "order_status":"confirmed",
//     "timestamp":"timestamp"
// }

  if (req.method === "GET") {
    return res.status(200).json({
      msg: "oof get",
    });
  } else if (req.method === "POST") {
    const jsonContent = req.body;
    return res.status(201).json({
      msg: "oof post",
      oof:jsonContent
    });
  } else {
    return res.status(400).json({
      msg: "only get / post requests",
    });
  }
}
