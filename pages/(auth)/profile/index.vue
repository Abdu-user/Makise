<template>
  <div
    class="grid md:grid-cols-2 gap-7 pb-10 items-start"
    v-if="state.userData?.personalInformation || isMounted"
  >
    <InfoCard
      :title="$t('account.personalInfoTitle')"
      :is-editing="isEditingPersonal"
      @save="updatePersonalInfo"
      @toggle="isEditingPersonal = !isEditingPersonal"
      @cancel="resetPersonalInfo"
    >
      <div class="mt-4 grid gap-3">
        <InfoCardInput
          :is-editing="isEditingPersonal"
          v-for="personal in personalInformations"
          :key="personal.variableName"
          :value="personalInfo[personal.variableName as keyof typeof personalInfo]"
          v-model="personalInfo[personal.variableName as keyof typeof personalInfo]"
          :subtitle="$t(personal.subtitleKey)"
          :placeholder="$t(personal.placeholderKey)"
        />
      </div>
    </InfoCard>
    <InfoCard
      :title="$t('account.idProofTitle')"
      :is-editing="isEditingIDProof"
      @save="updateIDProof"
      @toggle="isEditingIDProof = !isEditingIDProof"
      @cancel="resetIDProof"
    >
      <div class="mt-4 grid gap-3">
        <InfoCardInput
          v-for="idProof in IDProofs"
          :is-editing="isEditingIDProof"
          :value="IDProof[idProof.variableName as keyof typeof IDProof]"
          v-model="IDProof[idProof.variableName as keyof typeof IDProof]"
          :subtitle="$t(idProof.subtitleKey)"
          :placeholder="$t(idProof.placeholderKey)"
        />
      </div>
    </InfoCard>
  </div>
</template>
<script setup lang="ts">
import { IDProofs, personalInformations } from "~/constants";
import { useGlobalSettingStore } from "~/store/globalSetting";
import type { IDProofType, PersonalInfoType } from "~/types/type";
import { useI18n } from "vue-i18n"; // Import useI18n

const { t } = useI18n(); // Initialize t for translations

definePageMeta({
  layout: "profile",
  middleware: "auth",
});

const state = useGlobalSettingStore();

const isMounted = ref(false);
onMounted(() => {
  isMounted.value = true;
});

const personalInfo = ref<PersonalInfoType>({
  fullname: "",
  birthdayDate: "",
  age: "",
  bloodGroup: "",
  marriageStatus: "",
  gender: "",
  languages: "",
  region: "",
  nationality: "",
});
const isEditingPersonal = ref(false);

async function updatePersonalInfo() {
  if (!state.user?.$id) return;
  try {
    await useAppwriteDocumentUpdate(state.user?.$id, { personalInformation: JSON.stringify(personalInfo.value) });
    state.setFeedback("success", t("account.feedback.personalInfoSuccess"));
  } catch (error) {
    console.error("Error updating personal information:", error);
    state.setFeedback("error", t("account.feedback.personalInfoFailed"));
  }
}
const resetPersonalInfo = () => {
  const parsed = JSON.parse(state.userData?.personalInformation || "{}");
  personalInfo.value = { ...personalInfo.value, ...parsed };
};
watch(
  () => state.userData?.personalInformation,
  () => resetPersonalInfo()
);
onMounted(() => resetPersonalInfo());

// ID Proof
const IDProof = ref<IDProofType>({
  atomics: "",
  pin: "",
  passport: "",
  drivingLicense: "",
});
const isEditingIDProof = ref(false);
const updateIDProof = async () => {
  if (!state.user?.$id) return;
  try {
    await useAppwriteDocumentUpdate(state.user?.$id, { IDProof: JSON.stringify(IDProof.value) });
    state.setFeedback("success", t("account.feedback.idProofSuccess"));
  } catch (error) {
    console.error("Error updating ID Proof:", error);
    state.setFeedback("error", t("account.feedback.idProofFailed"));
  }
};
const resetIDProof = () => {
  const parsed = JSON.parse(state.userData?.IDProof || "{}");
  IDProof.value = { ...IDProof.value, ...parsed };
};
watch(
  () => state.userData?.IDProof,
  () => resetIDProof()
);

onMounted(() => resetIDProof());

onMounted(() => state.setRouteName(t("account.routeName")));
</script>

<style scoped></style>
