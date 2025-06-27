<template>
  <CustomContainer
    :id="id"
    variant="sectionWithLines"
    :section-number="sectionNumber"
  >
    <div class="space-y-6 pb-6">
      <h2 class="text-xl font-bold text-gray-800 dark:text-white">What does <code>CustomButton</code> do?</h2>

      <ul class="space-y-4 text-T3TextColor dark:text-darkT3TextColor list-disc list-inside">
        <li>
          <strong>Renders a flexible and styled button</strong> that can adapt to various use cases using props like <code>variant</code>,
          <code>size</code>, and <code>isPrimaryColor</code>.
        </li>
        <li>
          Button supports multiple visual styles through the <code>variant</code> prop: <code>default</code>, <code>primary</code>,
          <code>outlined</code>, <code>tonal</code>, <code>text</code>, and <code>plain</code>.
        </li>
        <li>
          The <code>isPrimaryColor</code> prop allows you to theme the button using either a <code>"primary"</code> or
          <code>"theme"</code> color set.
        </li>
        <li>The <code>loading</code> prop shows a spinner and disables interaction while loading.</li>
        <li>The <code>icon</code> prop turns the button into a square icon-only layout.</li>
        <li>
          Use <code>iconPosition</code> to place the icon on the <code>left</code>, <code>right</code>, or <code>top</code> of the text.
        </li>
        <li>The button reacts to <code>rounded</code> and <code>block</code> props to control its shape and width.</li>
        <li>
          Icon size and layout dynamically adjust based on the <code>size</code> prop (<code>sm</code>, <code>md</code>, <code>lg</code>).
        </li>
        <li class="text-red-500">
          ⚠️ <code>prependIcon</code> and <code>appendIcon</code> are deprecated and will log a console error if used.
        </li>
      </ul>

      <div class="bg-mainT2Bg dark:bg-darkMainT2Bg p-4 rounded text-sm font-mono text-T3TextColor dark:text-darkT3TextColor">
        <p><strong class="text-T2TextColor dark:text-darkT2TextColor">Props:</strong></p>
        <ul class="mt-2 space-y-1">
          <li><code>variant</code>: button style (e.g. "primary", "outlined")</li>
          <li><code>size</code>: button size ("sm", "md", "lg")</li>
          <li><code>icon</code>: icon-only button toggle</li>
          <li><code>iconPosition</code>: "left" | "right" | "top"</li>
          <li><code>isPrimaryColor</code>: color mode, "primary" or "theme"</li>
          <li><code>name</code>: icon name (passed to <code>&lt;Icon /&gt;</code>)</li>
          <li><code>loading</code>: shows loading spinner and disables button</li>
          <li><code>disabled</code>: disables the button</li>
          <li><code>rounded</code>: makes button fully rounded</li>
          <li><code>block</code>: makes the button full-width</li>
          <li class="line-through opacity-60"><code>prependIcon</code> / <code>appendIcon</code>: deprecated</li>
        </ul>
      </div>
    </div>
  </CustomContainer>
</template>

<script setup lang="ts">
defineProps({ id: { type: String, required: true }, sectionNumber: { type: [String, Number], required: true } });
</script>
