export interface HelpDocument {
  slug: string
  title: string
  markdown: string
}

export function buildHelpDocuments(): HelpDocument[] {
  const origin = 'http://192.168.3.53:8080'

  return [
    {
      slug: 'cherry-studio',
      title: 'Cherry Studio配置(推荐)',
      markdown: `
# Cherry Studio配置(推荐)

本页介绍如何把 ayaxAPI 添加为 Cherry Studio 的自定义 AI 服务商。开始前，请先在本站的 **API 密钥** 页面创建一个密钥。

> 示例中的 \`sk-xxx\` 是占位符。真实密钥只应填写在你自己的设备中，请勿粘贴到截图、教程或聊天记录里。

## Cherry Studio介绍

Cherry Studio 是一款集多模型对话、智能体 Agent、知识库管理、AI 绘画、翻译等功能于一体的全能 AI 工作台。小白友好，文档完善，还支持多种免费 Web 端 AI 工具，无需切换浏览器即可直接使用；将智能体派驻到飞书 / 微信 / Telegram / Discord 等 IM 平台担任群机器人；让智能体按计划自动运行（如每日新闻简报、每周汇总）等功能。

具体功能模块以及详细用法可以访问官网查看更多教程，本文只对如何接入模型做简短介绍。

https://docs.cherryai.com.cn/

## 添加自定义服务商

1. 打开 Cherry Studio，首次打开选择登录方式时可选择右上角的 **稍后设置**。进入 APP 后，点击左侧导航栏中的 **设置**（齿轮图标）。
2. 在设置页面中选择 **模型服务**。
3. 点击服务商列表下方的 **+ 添加服务商**，打开添加自定义提供商窗口。
4. 按下表填写服务商信息：

| 配置项 | 值 |
| --- | --- |
| 提供商名称 | \`ayaxAPI\` |
| API 密钥 | 本站创建的密钥，例如 \`sk-xxx\` |
| OpenAI Base URL | \`${origin}\` |

Cherry Studio 默认可配置 OpenAI 和 Anthropic 端点；在 **更多设置** 中还可以看到 OpenAI Responses、Gemini、图像生成及图像编辑等端点。连接本站时只需配置上表中的 OpenAI 端点，其他端点可保持为空。

> API 地址和密钥必须配套使用。请完整填写 \`${origin}\`，不要再追加 \`/chat/completions\` 等具体接口路径。

5. 检查填写内容，然后点击 **添加**。在弹出的模型选择界面中增加想要使用的模型，点击 **添加所选模型**；在随后弹出的界面中点击 **检测并启用**，等待检测完成即可。

> **注意：** 如果检测失败，可以关闭界面，在新增的服务商中同步模型，然后重新选择模型，手动点击 API 密钥右侧的 **检测**。检测成功后即可正常使用。

## 配置服务商

添加完成后，在模型服务列表中打开刚创建的 **ayaxAPI**：

1. 确认页面右上角的服务商开关已经开启；启用后，列表右侧会显示绿色圆点。
2. 点击 **获取模型列表**，让 Cherry Studio 从本站读取可用模型。
3. 不需要的模型可以通过模型右侧的 **-** 删除；模型名称、类型和价格等信息可在模型设置中调整。

## 开始使用

返回 Cherry Studio 的聊天界面，新建一个会话，然后选择 **ayaxAPI** 及刚添加的模型。发送一条简单消息；能够正常收到回复，且没有认证、模型或连接错误，即表示配置成功。

如果返回 401，请重新复制本站密钥并检查是否带有空格或换行。
`,
    },
    {
      slug: 'claude-code',
      title: 'Claude Code Cli快速上手',
      markdown: `
# Claude Code Cli快速上手

本页介绍如何安装 Claude Code，并将它连接到 ayaxAPI。开始前，请先在本站的 **API 密钥** 页面创建一个密钥。

> API 密钥只保存在你自己的设备中。截图、教程或聊天记录中请统一写成 \`sk-xxx\`，不要粘贴真实密钥。

## 步骤一：安装

### 安装 Git

Claude Code 会读取 Git 仓库状态。请先安装 [Git](https://git-scm.com/downloads)，安装完成后打开终端验证：

\`\`\`bash
git --version
\`\`\`

### 安装 Node.js

从 [Node.js 官网](https://nodejs.org/) 安装当前 LTS 版本，然后验证：

\`\`\`bash
node --version
npm --version
\`\`\`

### 安装 Claude Code

\`\`\`bash
npm install -g @anthropic-ai/claude-code
claude --version
\`\`\`

如果系统提示没有写入全局目录的权限，请按 npm 官方说明调整全局安装目录，不要直接给整个目录开放权限。

## 步骤二：配置 API

Claude Code 通过环境变量读取服务地址和密钥。本站 Claude 兼容接口的基础地址是：

\`\`\`text
${origin}
\`\`\`

### macOS 与 Linux

将下面两行加入 \`~/.zshrc\` 或 \`~/.bashrc\`，再重新打开终端：

\`\`\`bash
export ANTHROPIC_BASE_URL="${origin}"
export ANTHROPIC_AUTH_TOKEN="sk-xxx"
\`\`\`

临时测试时，也可以直接在当前终端执行这两行。关闭终端后，临时配置会失效。

### Windows PowerShell

\`\`\`powershell
[Environment]::SetEnvironmentVariable("ANTHROPIC_BASE_URL", "${origin}", "User")
[Environment]::SetEnvironmentVariable("ANTHROPIC_AUTH_TOKEN", "sk-xxx", "User")
\`\`\`

执行后关闭并重新打开 PowerShell。

### 使用 CC Switch

可访问:https://ccswitch.io/zh/docs?section=getting-started&item=quickstart<br>
查看详细教程，手动配置和使用CC Switch选其一即可

## 步骤三：启动

进入你的代码目录后运行：

\`\`\`bash
cd /path/to/your/project
claude
\`\`\`

首次启动时选择信任当前项目，然后发送一条简单消息验证连接。

## 模型选择

模型能否使用取决于账号所属分组。通过 Claude Code 的 \`/model\` 命令选择模型，不要凭示例猜测模型名。

## 常用命令

| 命令 | 用途 |
| --- | --- |
| \`claude\` | 在当前目录启动交互会话 |
| \`claude -p "问题"\` | 单次执行并输出结果 |
| \`/model\` | 查看或切换模型 |
| \`/status\` | 查看当前会话和账号状态 |
| \`/clear\` | 清空当前对话上下文 |
| \`/exit\` | 退出 Claude Code |

## 常见问题

### 返回 401

重新复制本站密钥，确认没有空格、换行或中文引号，并检查是否同时设置了旧的 \`ANTHROPIC_API_KEY\`。修改后要新开终端和会话。

### 无法连接

先在浏览器中确认当前站点可访问，再检查 \`ANTHROPIC_BASE_URL\` 是否完整。地址末尾无需添加 \`/v1/messages\`。

### 模型不可用

已有会话可能保留旧模型，切换后新建会话再试。
`,
    },
    {
      slug: 'codex',
      title: 'Codex CLI 快速上手',
      markdown: `
# Codex CLI 快速上手

本页介绍 Codex CLI 的安装和本站 API 配置。开始前，请在本站 **API 密钥** 页面创建密钥。

> 示例中的 \`sk-xxx\` 是占位符。请只在本机认证文件中填写真实密钥。

## 步骤一：安装

### 安装 Git

从 [Git 官网](https://git-scm.com/downloads) 安装适合当前系统的版本：

\`\`\`bash
git --version
\`\`\`

### 安装 Node.js

安装 [Node.js LTS](https://nodejs.org/)，并确认 Node.js 和 npm 可用：

\`\`\`bash
node --version
npm --version
\`\`\`

### 安装 Codex CLI

\`\`\`bash
npm install -g @openai/codex
codex --version
\`\`\`

## 步骤二：配置 API

Codex 的配置目录是 \`~/.codex\`。Windows 对应 \`C:\\Users\\<用户名>\\.codex\`。

### 配置 config.toml

创建或编辑 \`~/.codex/config.toml\`。将 \`你的模型名\` 替换成当前配置中可用的完整模型名：

\`\`\`toml
model_provider = "OpenAI"
model = "你的模型名"
model_reasoning_effort = "high"
disable_response_storage = true

[model_providers.OpenAI]
name = "OpenAI"
base_url = "${origin}"
wire_api = "responses"
requires_openai_auth = true
\`\`\`

如果文件里已有其他设置，请合并这些字段。\`model_provider\`、\`model\` 等字段应位于 TOML 顶层，不要误放到 \`[model_providers.OpenAI]\` 下面。

### 配置 auth.json

创建或编辑 \`~/.codex/auth.json\`：

\`\`\`json
{
  "OPENAI_API_KEY": "sk-xxx"
}
\`\`\`

Windows 用户在 \`C:\\Users\\<用户名>\\.codex\\auth.json\` 中写入相同内容。

### 使用 CC Switch

可访问:https://ccswitch.io/zh/docs?section=getting-started&item=quickstart<br>
查看详细教程，手动配置和使用CC Switch选其一即可

## 步骤三：启动

进入项目目录运行：

\`\`\`bash
cd /path/to/your/project
codex
\`\`\`

首次进入项目时，Codex 会询问是否信任当前目录。确认后发送一条简单消息，检查是否能正常返回。

## 推理强度

\`model_reasoning_effort\` 控制支持推理模型的思考强度。常见值为 \`low\`、\`medium\`、\`high\`，具体范围由模型决定。遇到模型不接受该参数时，删除这一行后重试。

## 常见问题

### 请求仍发往 api.openai.com

通常是 \`model_provider\` 没有放在 TOML 顶层，或 Codex 仍在使用启动前加载的旧配置。检查配置层级，完全退出 Codex，然后新建会话。

### 返回 401 Unauthorized

确认 \`auth.json\` 是合法 JSON，键名是 \`OPENAI_API_KEY\`，密钥没有空格或换行。如果曾登录 OpenAI 官方账号，退出旧会话后再验证自定义供应商。

### 返回模型不存在

使用当前配置中可用的模型名，不要使用教程里的占位文字。模型权限发生变化后，应新建会话。

### 配置文件没有生效

运行 Codex 的系统用户必须与配置文件所属用户一致。容器、远程终端和本机可能分别拥有不同的主目录。
`,
    },
    {
      slug: 'codex-desktop',
      title: 'Codex 桌面端配置',
      markdown: `
# Codex 桌面端配置

本页适用于带聊天窗口和设置界面的 Codex 桌面应用。桌面端与 CLI 共用 \`.codex\` 配置目录，因此可以手动配置，也可以由 CC Switch 写入。

> 配置前请在本站 **API 密钥** 页面创建密钥。

## 安装与准备

从 [Codex 官方应用文档](https://developers.openai.com/codex/app/) 获取适合当前系统的安装说明。首次打开后，确认应用能够进入主界面，然后完全退出应用再修改配置。

### 配置文件位置

| 系统 | 配置文件 | 认证文件 |
| --- | --- | --- |
| Windows | \`C:\\Users\\<用户名>\\.codex\\config.toml\` | \`C:\\Users\\<用户名>\\.codex\\auth.json\` |
| macOS | \`~/.codex/config.toml\` | \`~/.codex/auth.json\` |

修改前建议备份已有文件，以免覆盖其他供应商或个人设置。

## 使用 CC Switch

可访问:https://ccswitch.io/zh/docs?section=getting-started&item=quickstart<br>
查看详细教程，手动配置和使用CC Switch选其一即可

## 手动配置

### config.toml

将 \`你的模型名\` 替换为本站显示的真实模型名：

\`\`\`toml
model_provider = "OpenAI"
model = "你的模型名"
model_reasoning_effort = "high"
disable_response_storage = true

[model_providers.OpenAI]
name = "OpenAI"
base_url = "${origin}"
wire_api = "responses"
requires_openai_auth = true
\`\`\`

### auth.json

\`\`\`json
{
  "OPENAI_API_KEY": "sk-xxx"
}
\`\`\`

文件必须使用英文双引号且不能带注释。真实密钥只填写在自己的设备中。

## 验证配置

重新打开 Codex，创建一个全新会话，发送“请只回复：配置成功”。收到正常回复，并且没有认证、模型或连接错误，就说明配置已生效。

## 审批与会话问题

### 旧会话仍访问官方地址

桌面端会保留会话创建时的部分供应商信息。先新建会话测试；如果新会话正常，可以继续使用新会话，或在原会话菜单中创建分支。

### 修改后仍返回 401

按以下顺序检查：

1. 确认 \`base_url\` 是 \`${origin}\`。
2. 确认 \`model_provider = "OpenAI"\` 位于 TOML 顶层。
3. 确认 \`auth.json\` 中只有有效的 JSON 和正确密钥。
4. 在系统任务管理器中完全结束 Codex，再重新打开。
5. 新建会话验证，避免旧会话继续使用原供应商。

### 模型或图片能力报错

不同模型支持的工具和输入类型不同。先在本站查看模型说明，换用支持当前能力的模型，然后新建会话。

### 审批操作没有执行

查看应用中的审批模式和项目权限，确认当前目录受信任。模型只能提出工具调用，最终是否执行仍由桌面端的权限设置决定。
`,
    },
    {
      slug: 'obsidian-codex',
      title: 'Obsidian 接入 Codex（MCP）',
      markdown: `
# Obsidian 接入 Codex（MCP）

本页介绍怎样让 Codex 直接查看、搜索和编辑 Obsidian 笔记。示例基于桌面版 Obsidian，以及已经内置 MCP 的 **Local REST API with MCP** 插件（已用 5.4.0 版本验证：Codex 通过 \`http://127.0.0.1:27123/mcp/\` 成功列出目录、读取笔记）。

> 文中的 API Key 全部使用占位符 \`你的_OBSIDIAN_API_KEY\`，请只在自己的设备中填写真实值。如果你的插件只有 REST API、没有 MCP 功能，不能直接照抄本文的 MCP 地址：先确认插件版本和设置页面是否提供 MCP，旧版本可升级到兼容版本后再接入。

## 先弄明白：各部分负责什么

整个过程可以理解成：

\`\`\`text
Codex → 本机 MCP 地址 → Obsidian 插件 → 当前打开的笔记库
\`\`\`

- **Obsidian**：保存和展示笔记。
- **插件**：在 Obsidian 内启动服务，让其他软件可以操作笔记。
- **MCP**：让 Codex 知道“有哪些工具可用、怎样调用这些工具”。
- **API Key**：访问服务的钥匙，Codex 需要带着它才能读取或修改笔记。

插件随 Obsidian 运行。**使用期间要保持 Obsidian 和目标笔记库打开，不能把程序完全退出。** 这套内置 MCP 的方案不需要另外安装 Python、Node.js，也不需要再启动第三方 MCP 转接程序。

## 准备 Obsidian 插件

### 第 1 步：打开正确的笔记库

先在 Obsidian 中打开你希望 Codex 操作的笔记库。插件设置是按笔记库保存的，切换到另一套笔记库后，需要确认那边也安装并启用了插件。

### 第 2 步：安装并启用插件

进入 **设置 → 第三方插件／社区插件 → 浏览**，搜索 **Local REST API**，确认插件作者是 **Adam Coddington**，再安装、启用。支持本文方案的版本在设置或插件名称中会显示 **Local REST API with MCP**。

已经安装的，可以在“已安装插件”中确认开关已打开。若当前版本没有 MCP，先检查更新，并确认新版本与自己的 Obsidian 版本兼容（5.4.0 的插件清单声明最低 Obsidian 版本为 1.13.1）。

### 第 3 步：打开本机 HTTP 服务

进入插件设置，找到 \`Enable non-encrypted (HTTP) server\`（启用未加密的 HTTP 服务），打开这个开关，然后确认：

| 设置 | 本文使用的值 |
| --- | --- |
| Non-encrypted (HTTP) server port | \`27123\` |
| Binding host | \`127.0.0.1\` |
| Authorization header | \`Authorization\` |

本文选择本机 HTTP，是因为配置简单，并且可以避开 HTTPS 证书兼容问题。**这个方案只适用于 Codex 和 Obsidian 在同一台电脑上运行。保持绑定本机地址，不要为了连接而改成对外开放的 \`0.0.0.0\`。**

默认端口不要混淆：

| 方式 | 地址 |
| --- | --- |
| HTTP | \`http://127.0.0.1:27123/mcp/\` |
| HTTPS | \`https://127.0.0.1:27124/mcp/\` |

如果修改过端口，下面所有地址都要同步修改。

### 第 4 步：复制 API Key

在插件设置里找到 **API key**，复制完整的值。这是 **Obsidian 插件的 API Key**，不是 OpenAI 的 API Key，也不是本站密钥，更不是 Codex 的登录凭据。稍后配置中的 \`你的_OBSIDIAN_API_KEY\` 都要换成这个值，不要把真实值写进笔记、截图或公开仓库。

## 配置 Codex：编辑配置文件

这种方式适合桌面版 Codex，也适合使用同一配置目录的 Codex CLI。

### 第 5 步：打开配置文件

macOS 和 Linux 通常位于 \`~/.codex/config.toml\`；Windows 通常位于用户目录下的 \`.codex\\config.toml\`。如果设置过 \`CODEX_HOME\`，应检查对应目录里的 \`config.toml\`。

修改前建议复制一份备份，保留原有模型、本站供应商和其他 MCP 配置。

### 第 6 步：加入 Obsidian 配置

在文件末尾添加：

\`\`\`toml
[mcp_servers.obsidian]
url = "http://127.0.0.1:27123/mcp/"

[mcp_servers.obsidian.http_headers]
Authorization = "Bearer 你的_OBSIDIAN_API_KEY"
\`\`\`

逐项解释：

- \`obsidian\` 是你给这项服务取的名字。
- \`url\` 是插件的 MCP 地址，**要包含结尾的 \`/mcp/\`**。
- \`Authorization\` 是认证请求头的名称，\`Bearer\` 后面是一个空格，再接完整 API Key。

填写时保留英文双引号，把占位符换成真实值，不要额外加尖括号、换行或空格。

**如果已经存在 \`[mcp_servers.obsidian]\`，就在原配置上修改，不能再加一套同名配置。** 如果原来使用 HTTPS，可以把 URL 改成上面的 HTTP 地址，同时保留正确的认证配置。

这种方式会把 API Key 明文保存在本机配置文件中，请避免公开分享完整文件；需要分享时，先把密钥替换成占位符。

### 第 7 步：重新启动 Codex

1. 保持 Obsidian 和目标笔记库打开。
2. 完全退出 Codex，再重新启动。
3. 新建一个对话，验证工具能否使用。

只在原对话中继续发消息，不一定会重新加载 MCP 配置。如果客户端有明确的“重连 MCP”入口，也可以先使用它；重启通常最容易排除旧连接的影响。

## 验证：怎样才算接入成功

先发送一个只读请求：

> 请通过 Obsidian MCP 列出当前笔记库根目录中的文件和文件夹，不修改任何内容。

如果 Codex 真正调用了 \`vault_list\` 并返回笔记库目录，说明连接、认证和 MCP 工具调用都正常。

再让它读取一篇已存在的笔记：

> 请通过 Obsidian MCP 读取“项目/代码运行.md”，概括里面的内容，不修改文件。

把路径换成自己库里实际存在的文件。路径是**相对笔记库根目录**的，不是电脑上的完整路径。

需要确认写入能力时，再明确授权它创建一篇新笔记：

> 请在 Obsidian 的“项目/MCP接入验证.md”中新建一篇笔记，内容写“Obsidian MCP 已接入 Codex”。如果同名笔记已存在，请先告诉我，不要覆盖。

回到 Obsidian 查看文件，能看到内容才算写入成功。

> “配置文件中有 obsidian”只说明已经登记服务；实际列目录、读笔记、写笔记成功，才说明相应功能可用。

## 可选：用 CLI 和环境变量配置

已经有 \`codex\` 命令、并习惯从终端启动的人可以使用这个方式。**与上面的配置文件方式选择一种即可。**

先在 macOS / Linux 的 Bash 或 Zsh 终端中输入（输入时屏幕不显示内容，这是正常的，变量里只放 API Key 本身，不要加 \`Bearer \`）：

\`\`\`bash
read -r -s -p "粘贴 Obsidian API Key 后按回车: " OBSIDIAN_API_KEY
printf '\\n'
export OBSIDIAN_API_KEY
\`\`\`

如果还没有登记同名服务，再执行：

\`\`\`bash
codex mcp add obsidian \\
  --url http://127.0.0.1:27123/mcp/ \\
  --bearer-token-env-var OBSIDIAN_API_KEY
\`\`\`

这会让 Codex 从环境变量中读取认证值，对应的配置形式是：

\`\`\`toml
[mcp_servers.obsidian]
url = "http://127.0.0.1:27123/mcp/"
bearer_token_env_var = "OBSIDIAN_API_KEY"
\`\`\`

如果已经有同名服务，直接编辑现有配置；改为环境变量方式时，移除旧的 \`Authorization\` 配置，避免同时保留两种认证来源。然后在**同一个终端**里启动 \`codex\`，可以用 \`codex mcp list\` 查看服务登记情况。

注意两点：

- 当前终端设置的变量不会自动进入所有程序。**从桌面图标启动的 Codex，通常读不到刚刚在终端中设置的变量。** 使用桌面版时，直接配置请求头更容易理解。
- 关闭终端后，新开的终端需要重新设置变量。

CLI 参数已对照 Codex 0.159.2 的命令帮助核对；环境变量接入分支未实际验证。

## 常见问题

最省时间的排查顺序是：**Obsidian 是否运行 → 插件是否启用 → HTTP 端口是否开启 → API Key 是否正确 → Codex 是否重载 → 实际工具调用是否成功。**

### 提示 Connection refused 或 Failed to connect

通常表示服务没有启动，或者地址、端口不对。依次检查：

1. Obsidian 是否还在运行，是否打开了目标笔记库。
2. 插件开关是否打开，\`Enable non-encrypted (HTTP) server\` 是否开启。
3. HTTP 端口是不是 \`27123\`，URL 是否是 \`http://127.0.0.1:27123/mcp/\`。

Linux 下可以用 \`ss -ltn 'sport = :27123'\` 查看端口监听，出现 \`LISTEN\` 表示该端口有程序在监听。没有监听时，先处理 Obsidian 和插件，反复修改认证配置没有帮助；端口有监听也不代表认证或 MCP 一定正常。

### 返回 401、Unauthorized 或 Authorization required

请求已到达服务，但认证没有通过。检查：

- 用的是不是当前笔记库插件设置中的 API Key。
- 有没有漏掉 \`Bearer\` 或它后面的空格。
- 复制时有没有缺字符、混入换行。
- 插件的 \`Authorization header\` 是否仍为 \`Authorization\`。
- 有没有重置过 API Key，却没有同步更新 Codex。
- 环境变量方式下，启动 Codex 的进程是否真的继承了变量。

本方案使用插件 API Key，不是浏览器 OAuth 登录，不需要运行 \`codex mcp login obsidian\`。如果返回 \`429\`，可能是错误密钥尝试太多触发限流：先修正密钥，按响应中的 \`Retry-After\` 等待，不要连续重试错误配置。

### HTTPS 报证书错误

例如 \`certificate verify failed\`、\`unsupported name constraint type\` 或 \`UNSUPPORTED_CONSTRAINT_TYPE\`。这通常是证书信任或 TLS 兼容问题。如果 Codex 和 Obsidian 都在本机，先开启 HTTP 并改用 \`http://127.0.0.1:27123/mcp/\`。**只改 URL 还不够，插件的 HTTP 开关也必须开启。**

确实需要 HTTPS 时，应单独检查插件证书、主机名或 IP、客户端信任设置以及版本兼容性。

### 浏览器打开地址报 400、404、405 或显示一段 JSON

MCP 地址不是普通网页，不能仅凭浏览器结果判断成败。\`404\` 先检查是否漏掉 \`/mcp/\`、插件版本是否支持 MCP；\`400\` 或 \`405\` 可能是请求缺少 MCP 必需的参数、会话信息或使用了不支持的方法。**用 Codex 的“列出笔记库目录”请求验证，比浏览器直接打开更可靠。**

### TOML 配置报错，或 Codex 没出现 Obsidian 工具

1. 是否重复添加了 \`[mcp_servers.obsidian]\`。
2. 是否把 JSON 配置直接粘进了 TOML 文件。
3. 是否漏了英文双引号，或者用了中文引号。
4. 是否编辑了当前 Codex 实际使用的配置目录。
5. 是否完全退出并重新启动 Codex。

本文使用 HTTP MCP 地址，不要把别的软件使用的 \`mcpServers\` JSON 结构，或 stdio 服务的 \`command\`、\`args\` 配置混进来。

### 终端提示“codex: 未找到命令”

说明当前终端找不到 CLI，不代表桌面版没有 MCP 能力。可以继续使用 \`config.toml\` 方式；需要 CLI 时，再按官方说明安装或修正 PATH。

### 昨天能用，今天不能用

优先检查：是否完全退出了 Obsidian、是否切换了笔记库、HTTP 开关或端口是否变了、API Key 是否变了、Codex 是否还在使用旧会话。如果同时打开多个笔记库，它们各自启动的插件还可能争用同一个端口：先关闭无关窗口，或为不同库分配不同端口。

### Codex 和 Obsidian 不在同一环境

\`127.0.0.1\` 指的是**发起连接那一侧自己**。例如 Codex 在容器内、Obsidian 在宿主机，容器里的 \`127.0.0.1\` 通常不是宿主机；WSL 与 Windows 之间也要单独处理。此时需要单独处理网络可达性、插件绑定地址和认证，不要直接照抄本文配置，更不要把带 API Key 的 HTTP 服务暴露到公网。

## 参考资料

- [OpenAI：Codex MCP](https://developers.openai.com/codex/mcp)
- [OpenAI：Codex 配置参考](https://developers.openai.com/codex/config-reference)
- [Local REST API 插件项目](https://github.com/coddingtonbear/obsidian-local-rest-api)

不同版本的界面名称可能变化，请以自己的插件设置和官方更新为准。
`,
    },
    {
      slug: 'obsidian-claude',
      title: 'Obsidian 接入 Claude Code（MCP）',
      markdown: `
# Obsidian 接入 Claude Code（MCP）

**MCP** 可以理解成 Claude 的“外接插座”。接好之后，Claude 就能直接读、写、搜索你的 Obsidian 笔记，不用你复制粘贴。

整条链路只有三段：

\`\`\`text
Claude Code ──(MCP)──► Obsidian 里的 Local REST API 插件 ──► 你的笔记库(vault)
\`\`\`

关键点：**Obsidian 必须开着，插件必须启用**。Claude 实际上是通过这个插件操作笔记的。

## 准备工作

开始前确认三件事：

| 检查项 | 怎么确认 |
| --- | --- |
| 已安装 Obsidian，且打开了要操作的那个 vault | 能正常看到笔记列表 |
| 已安装 Claude Code | 终端输入 \`claude --version\` 有版本号 |
| 仅“方案 B”需要：已安装 \`uv\` | 终端输入 \`uvx --version\` 有版本号 |

## 第一步：在 Obsidian 里装插件并拿到 API Key

1. 打开 Obsidian，点击左下角 **设置（齿轮）** → **第三方插件**。
2. 如果提示“安全模式”，先点 **关闭安全模式**。
3. 点 **浏览**，搜索 **Local REST API**，点 **安装**，再点 **启用**。
4. 回到设置，左侧会多出 **Local REST API** 一项，点进去。
5. 在页面里找到 **API Key** 并复制。**这串字符就是 Claude 的“钥匙”，不要发给别人，也不要写进笔记或提交到 git。**
6. 在同一个页面记下访问地址（一般是 \`127.0.0.1\`）和端口号：常见是 **27124（HTTPS）** 和 **27123（HTTP）**，以你页面上显示的为准。

> 插件设置页里通常会直接给出可用的连接地址，后面配置时**以那里显示的为准**，不要凭记忆写。

## 第二步：接到 Claude Code

有两种接法，**优先试方案 A**，不行再用方案 B。

### 方案 A：直接用 HTTP 方式连插件（新版插件自带 MCP 时）

在终端执行，把 \`你的_OBSIDIAN_API_KEY\` 换成自己的 Key：

\`\`\`bash
claude mcp add --transport http obsidian http://127.0.0.1:27123/mcp/ \\
  --header "Authorization: Bearer 你的_OBSIDIAN_API_KEY"
\`\`\`

- \`obsidian\` 是你给这个连接起的名字，随便取，后面会一直用到。
- 地址和端口一定要和插件设置页一致。上面的 \`http://127.0.0.1:27123/mcp/\` 对应插件 5.4.0 默认开启 HTTP 服务时的地址；如果插件里没有开启 HTTP 服务，需要先在插件设置中打开 \`Enable non-encrypted (HTTP) server\`。

### 方案 B：用第三方 mcp-obsidian（老版本插件也能用）

\`\`\`bash
claude mcp add obsidian \\
  -e OBSIDIAN_API_KEY=你的_OBSIDIAN_API_KEY \\
  -e OBSIDIAN_HOST=127.0.0.1 \\
  -e OBSIDIAN_PORT=27124 \\
  -- uvx mcp-obsidian
\`\`\`

意思是：让 Claude 启动一个叫 \`mcp-obsidian\` 的小程序，由它去找 Obsidian 插件说话，钥匙和地址通过环境变量（\`-e\`）传进去。

### 想让所有项目都能用？

加上 \`-s user\`，这样不论在哪个目录启动 Claude，都能用到 Obsidian：

\`\`\`bash
claude mcp add -s user --transport http obsidian http://127.0.0.1:27123/mcp/ \\
  --header "Authorization: Bearer 你的_OBSIDIAN_API_KEY"
\`\`\`

不加的话，默认只在当前项目目录下生效。

## 第三步：验证有没有接通

1. **重启 Claude Code**（退出后重新输入 \`claude\`）。新加的 MCP 在已经打开的会话里不一定会立刻出现。
2. 在 Claude 里输入 \`/mcp\`，应该能看到 \`obsidian\`，状态是 **connected**。
3. 直接对 Claude 说“列出我 Obsidian 根目录下的文件”，能返回你的笔记名，就说明成功了。

也可以在终端用 \`claude mcp list\` 查看状态。

## 接通后能做什么

- 读笔记，按关键词、标签、属性搜索笔记。
- 新建、追加、修改笔记，修改某个标题下的内容。
- 移动、复制、删除笔记。
- 在 Obsidian 里打开指定文件。
- 查看所有标签。

示例说法：

- “在 \`其他/\` 目录下新建一篇笔记，内容是……”
- “搜一下我所有提到 CUDA 的笔记”
- “把今天的日志里‘待办’那一段补上这几条”

## 常见问题

### /mcp 里看不到 obsidian，或显示 failed

- **先确认 Obsidian 已经打开**，并且打开的就是目标 vault。Obsidian 关了，插件服务也就停了。
- 确认 Local REST API 插件是**已启用**状态。
- 重启 Claude Code 再看一次。
- 终端执行 \`claude mcp list\`，看有没有这一项；没有说明命令没执行成功，重新添加即可。

### 报 401 / Unauthorized / 认证失败

**API Key 不对。** 最常见原因：复制时多带了空格，或者在插件里重新生成了 Key 但 Claude 里还是旧的。处理：回插件设置页重新复制 Key，删掉旧配置，再用新 Key 添加一次：

\`\`\`bash
claude mcp remove obsidian
claude mcp add --transport http obsidian http://127.0.0.1:27123/mcp/ \\
  --header "Authorization: Bearer 新的_OBSIDIAN_API_KEY"
\`\`\`

### 连接被拒绝 / Connection refused / 超时

- **端口写错了**。回插件设置页核对端口，27123 和 27124 别搞混。
- 端口被别的程序占用：在插件设置里换一个端口，Claude 那边同步改。
- 插件设置里可能把某种连接方式（HTTP 或 HTTPS）关掉了，打开对应的开关。

### HTTPS 证书报错（self signed certificate）

插件的 HTTPS 用的是自签名证书，有些工具默认不信任。两种办法：

- 改用 **HTTP 端口（27123）**，最省事。因为只在本机访问，风险很小。
- 或者按插件设置页里的说明，把证书导出并设为信任。

### 提示 uvx: command not found（方案 B）

没装 \`uv\`。macOS 上执行 \`brew install uv\`，装完**重开终端**再试。

### 添加成功了，但 Claude 说“没有这个工具”

- 多半是**没重启**。退出 Claude Code 重新进入。
- 或者在 A 目录添加（默认只对该项目生效），却在 B 目录启动。用 \`-s user\` 重新添加即可。

### 中文文件名 / 路径找不到

- 路径是**相对于 vault 根目录**的，不要写成电脑上的绝对路径。
- 例如写 \`其他/Codex-Cli安装.md\`，不要写 \`/Users/你的用户名/.../其他/Codex-Cli安装.md\`。
- 文件名里的空格、中文照写即可。

### 担心 Claude 误改、误删笔记

- **“写入”操作会直接覆盖同名文件**，不会先问你。重要笔记改之前，先让 Claude 说明打算怎么改，或者先让它复制一份备份。
- 删除默认进的是回收站（取决于 Obsidian 里“已删除文件”的设置），不是彻底删掉。
- Claude Code 每次调用工具默认会请求你确认，不熟悉前**不要**把权限一路放开。

## 安全注意事项

- **API Key 等同于笔记库的全部权限**，别贴到聊天、截图或公开仓库里。
- 这个服务只监听本机（127.0.0.1），不要为了“方便”把它暴露到公网或局域网。
- 如果怀疑 Key 泄露：在插件设置里重新生成，然后按上面“401”那一节更新 Claude 的配置。

## 常用命令速查

\`\`\`bash
claude mcp list              # 看所有 MCP 及状态
claude mcp remove obsidian   # 删除这个连接
\`\`\`

在 Claude 会话里输入 \`/mcp\` 查看连接状态。

> 说明：方案 B 的环境变量名（\`OBSIDIAN_API_KEY\`、\`OBSIDIAN_HOST\`、\`OBSIDIAN_PORT\`）来自 \`mcp-obsidian\` 的常见用法；本页命令未在本站环境中重新执行验证，不同版本的插件和 Claude Code 可能略有差异，请以各自的设置页和 \`claude mcp add --help\` 为准。
`,
    },
  ]
}
