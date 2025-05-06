import { config } from "dotenv";
import { cleanEnv, str } from "envalid";

await config({ export: true });

export default cleanEnv(Deno.env.toObject(), {
  BOT_TOKEN: str(),
  WEBHOOK_PATH: str(),
}, {
  // 避免在 Deno Deploy 中使用 Deno.exit，改为抛出异常
  reporter: ({ errors }) => {
    console.error("❌ 环境变量校验失败:", errors);
    throw new Error("环境变量无效，终止执行。");
  }
});
