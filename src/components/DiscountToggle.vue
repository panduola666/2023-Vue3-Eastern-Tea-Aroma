<template>
  <SwitchGroup>
    <div class="flex items-center">
      <TailWindSwitch
        v-model="enabled"
        :class="enabled ? 'bg-brand-01' : 'bg-gray-03'"
        class="relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-brand-01 focus:ring-offset-2"
      >
        <span
          :class="enabled ? 'translate-x-6' : 'translate-x-1'"
          class="inline-block h-4 w-4 transform rounded-full bg-white transition-transform"
        />
      </TailWindSwitch>
      <SwitchLabel class="ml-2">
        <span v-if="enabled" class="text-brand-02">已套用折扣</span>
        <span v-else class="text-gray-02">未使用折扣</span>
      </SwitchLabel>
    </div>
  </SwitchGroup>
</template>
<script>
import { Switch, SwitchGroup, SwitchLabel } from "@headlessui/vue";
export default {
  data() {
    return {
      enabled: false,
    };
  },
  components: {
    TailWindSwitch: Switch,
    SwitchGroup,
    SwitchLabel,
  },
};
</script>