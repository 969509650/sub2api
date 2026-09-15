<template>
  <AppLayout>
    <div class="mx-auto max-w-4xl space-y-6">
      <div>
        <h1 class="text-2xl font-bold text-gray-900 dark:text-white">教程与帮助</h1>
        <p class="mt-1 text-gray-500 dark:text-gray-400">Sub2API 使用说明</p>
      </div>
      <article class="prose prose-gray max-w-none rounded-2xl bg-white p-6 shadow-sm dark:prose-invert dark:bg-dark-800">
        <h2>快速开始</h2>
        <p>在“API 密钥”页面创建密钥，将接口地址和密钥配置到兼容 OpenAI API 的客户端中即可使用。</p>
        <h2>添加模型渠道</h2>
        <p>管理员进入“账号”或“渠道管理”，选择 OpenAI 兼容类型，填写平台 Base URL、API Key 和模型名称。</p>
        <ul>
          <li>DeepSeek：<code>https://api.deepseek.com/v1</code>，模型如 <code>deepseek-chat</code>。</li>
          <li>智谱 GLM：<code>https://open.bigmodel.cn/api/paas/v4</code>，模型如 <code>glm-4.5</code>。</li>
          <li>MiniMax：填写官方文档提供的 OpenAI 兼容地址和模型名。</li>
        </ul>
        <h2>使用与维护</h2>
        <p>教程内容源码位于 <code>frontend/src/views/user/HelpView.vue</code>。修改后重新构建前端镜像即可更新页面。</p>
        <p>如需补充内容，直接编辑本页面中的 Markdown 风格 HTML 文本。</p>
      </article>
    </div>
  </AppLayout>
</template>

<script setup lang="ts">
import AppLayout from '@/components/layout/AppLayout.vue'
</script>
