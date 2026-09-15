export interface HelpDocument {
  slug: string
  title: string
  description: string
  category: string
  sourceUrl: string
  markdown: string
}

function trimTrailingSlash(value: string): string {
  return value.replace(/\/+$/, '')
}

export function buildHelpDocuments(siteOrigin: string): HelpDocument[] {
  const origin = trimTrailingSlash(siteOrigin)
  const openAiBaseUrl = `${origin}/v1`

  return [
    {
      slug: 'claude-code',
      title: 'Claude Code 快速上手',
      description: '安装 Claude Code，并通过本站 API 密钥完成连接。',
      category: '配置指南',
      sourceUrl: 'https://docs.micuapi.ai/claude-code',
      markdown: `
# Claude Code 快速上手

本页介绍如何安装 Claude Code，并将它连接到当前 Sub2API 站点。开始前，请先在本站的 **API 密钥** 页面创建一个密钥，再到 **可用渠道** 页面确认可用模型。

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

如果你已经使用 CC Switch，可以新建一个 Claude 供应商，将 API 地址设为 \`${origin}\`，填入本站密钥并启用。配置后请完全退出 Claude Code，再重新打开，避免旧进程继续读取原来的环境变量。

## 步骤三：启动

进入你的代码目录后运行：

\`\`\`bash
cd /path/to/your/project
claude
\`\`\`

首次启动时选择信任当前项目，然后发送一条简单消息验证连接。

## 模型选择

模型能否使用取决于账号所属分组。先在本站 **可用渠道** 页面查看完整模型名，再通过 Claude Code 的 \`/model\` 命令选择。不要凭示例猜测模型名。

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

到 **可用渠道** 页面核对模型名和分组权限。已有会话可能保留旧模型，切换后新建会话再试。

---

参考界面与主题：[micuapi Claude Code 文档](https://docs.micuapi.ai/claude-code)。本文内容已按当前 Sub2API 部署重新整理。
`,
    },
    {
      slug: 'codex',
      title: 'Codex CLI 快速上手',
      description: '安装 Codex CLI，配置 Responses API，并验证命令行会话。',
      category: '配置指南',
      sourceUrl: 'https://docs.micuapi.ai/codex',
      markdown: `
# Codex CLI 快速上手

本页介绍 Codex CLI 的安装和本站 API 配置。开始前，请在本站 **API 密钥** 页面创建密钥，并在 **可用渠道** 页面复制一个支持 Responses API 的完整模型名。

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

创建或编辑 \`~/.codex/config.toml\`。将 \`你的模型名\` 替换成本站 **可用渠道** 页面显示的完整模型名：

\`\`\`toml
model_provider = "sub2api"
model = "你的模型名"
model_reasoning_effort = "high"
disable_response_storage = true

[model_providers.sub2api]
name = "Sub2API"
base_url = "${openAiBaseUrl}"
wire_api = "responses"
requires_openai_auth = true
\`\`\`

如果文件里已有其他设置，请合并这些字段。\`model_provider\`、\`model\` 等字段应位于 TOML 顶层，不要误放到 \`[model_providers.sub2api]\` 下面。

### 配置 auth.json

创建或编辑 \`~/.codex/auth.json\`：

\`\`\`json
{
  "OPENAI_API_KEY": "sk-xxx"
}
\`\`\`

Windows 用户在 \`C:\\Users\\<用户名>\\.codex\\auth.json\` 中写入相同内容。

### 使用 CC Switch

也可以在 CC Switch 中选择 Codex，新建自定义供应商。API 地址填写 \`${openAiBaseUrl}\`，协议选择 Responses，保存并启用后重新打开终端。

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

复制本站 **可用渠道** 中的模型名，不要使用教程里的占位文字。模型权限发生变化后，应新建会话。

### 配置文件没有生效

运行 Codex 的系统用户必须与配置文件所属用户一致。容器、远程终端和本机可能分别拥有不同的主目录。

---

参考界面与主题：[micuapi Codex CLI 文档](https://docs.micuapi.ai/codex)。本文内容已按当前 Sub2API 部署重新整理。
`,
    },
    {
      slug: 'codex-desktop',
      title: 'Codex 桌面端配置',
      description: '为 Codex 桌面应用写入自定义供应商配置并排查会话问题。',
      category: 'Codex',
      sourceUrl: 'https://docs.micuapi.ai/codex/desktop',
      markdown: `
# Codex 桌面端配置

本页适用于带聊天窗口和设置界面的 Codex 桌面应用。桌面端与 CLI 共用 \`.codex\` 配置目录，因此可以手动配置，也可以由 CC Switch 写入。

> 配置前请在本站 **API 密钥** 页面创建密钥，并到 **可用渠道** 页面确认完整模型名。

## 安装与准备

从 [Codex 官方应用文档](https://developers.openai.com/codex/app/) 获取适合当前系统的安装说明。首次打开后，确认应用能够进入主界面，然后完全退出应用再修改配置。

### 配置文件位置

| 系统 | 配置文件 | 认证文件 |
| --- | --- | --- |
| Windows | \`C:\\Users\\<用户名>\\.codex\\config.toml\` | \`C:\\Users\\<用户名>\\.codex\\auth.json\` |
| macOS | \`~/.codex/config.toml\` | \`~/.codex/auth.json\` |

修改前建议备份已有文件，以免覆盖其他供应商或个人设置。

## 使用 CC Switch

在 CC Switch 中选择 Codex，新增自定义供应商，填写以下信息：

| 配置项 | 值 |
| --- | --- |
| API 地址 | \`${openAiBaseUrl}\` |
| API 密钥 | 本站创建的密钥 |
| API 协议 | Responses |
| 模型 | 可用渠道中的完整模型名 |

保存并启用配置后，完全退出 Codex 桌面应用，再重新打开。已经打开的进程不会自动重新读取所有配置。

## 手动配置

### config.toml

将 \`你的模型名\` 替换为本站显示的真实模型名：

\`\`\`toml
model_provider = "sub2api"
model = "你的模型名"
model_reasoning_effort = "high"
disable_response_storage = true

[model_providers.sub2api]
name = "Sub2API"
base_url = "${openAiBaseUrl}"
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

1. 确认 \`base_url\` 是 \`${openAiBaseUrl}\`。
2. 确认 \`model_provider = "sub2api"\` 位于 TOML 顶层。
3. 确认 \`auth.json\` 中只有有效的 JSON 和正确密钥。
4. 在系统任务管理器中完全结束 Codex，再重新打开。
5. 新建会话验证，避免旧会话继续使用原供应商。

### 模型或图片能力报错

不同模型支持的工具和输入类型不同。先在本站查看模型说明，换用支持当前能力的模型，然后新建会话。

### 审批操作没有执行

查看应用中的审批模式和项目权限，确认当前目录受信任。模型只能提出工具调用，最终是否执行仍由桌面端的权限设置决定。

---

参考界面与主题：[micuapi Codex 桌面端文档](https://docs.micuapi.ai/codex/desktop)。本文内容已按当前 Sub2API 部署重新整理。
`,
    },
  ]
}

export function searchHelpDocuments(documents: HelpDocument[], query: string): HelpDocument[] {
  const normalized = query.trim().toLocaleLowerCase()
  if (!normalized) return documents

  const terms = normalized.split(/\s+/).filter(Boolean)
  return documents.filter((document) => {
    const searchable = [document.title, document.description, document.category, document.markdown]
      .join(' ')
      .toLocaleLowerCase()
    return terms.every((term) => searchable.includes(term))
  })
}
