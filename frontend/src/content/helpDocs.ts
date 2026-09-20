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
  ]
}
