<template>
  <CustomContainer
    :id="id"
    variant="sectionWithLines"
    :section-number="sectionNumber"
  >
    <div class="space-y-6 pb-6">
      <h2 class="text-xl font-bold text-gray-800 dark:text-white">What does <code>CustomLabel</code> do?</h2>

      <ul class="space-y-4 text-T3TextColor dark:text-darkT3TextColor list-disc list-inside">
        <li>
          <strong>Renders a label</strong> with a customizable style defined by a <code>variant</code> prop. Currently, it uses the
          <code>default</code> style.
        </li>
        <li>
          If an <code class="text-T2TextColor dark:text-darkT2TextColor">error</code> string is passed, it will display that error instead
          of the default slot content, and:
          <ul class="list-disc list-inside ml-5 mt-1 space-y-1">
            <li>The label text will appear in red.</li>
            <li>The text will shake (animated) if <code>isAnimatingN</code> changes.</li>
          </ul>
        </li>
        <li>You can control how long the shake animation lasts using <code>animationTime</code> (in milliseconds).</li>
        <li>If no <code>error</code> is passed, it renders whatever is passed through the default <code>&lt;slot&gt;</code>.</li>
        <li>
          The animation behavior is managed by <code>ref</code> and <code>watch</code>, making sure it re-triggers whenever
          <code>isAnimatingN</code> changes.
        </li>
      </ul>

      <div class="bg-mainT2Bg dark:bg-darkMainT2Bg p-4 rounded text-sm font-mono text-T3TextColor dark:text-darkT3TextColor">
        <p><strong class="text-T2TextColor dark:text-darkT2TextColor">Props:</strong></p>
        <ul class="mt-2 space-y-1">
          <li>
            <code class="text-T2TextColor dark:text-darkT2TextColor">variant</code>: controls the label style (default:
            <code>"default"</code>)
          </li>
          <li><code class="text-T2TextColor dark:text-darkT2TextColor">error</code>: a string to show instead of slot content</li>
          <li>
            <code class="text-T2TextColor dark:text-darkT2TextColor">isAnimatingN</code>: number that triggers the shake animation on change
          </li>
          <li>
            <code class="text-T2TextColor dark:text-darkT2TextColor">animationTime</code>: duration of the animation in ms (default: 500)
          </li>
        </ul>
      </div>
    </div>
  </CustomContainer>
</template>

<script setup lang="ts">
defineProps({ id: { type: String, required: true }, sectionNumber: { type: [String, Number], required: true } });
</script>
