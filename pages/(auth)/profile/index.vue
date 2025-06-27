<template>
  <!-- <InfoCard -->
  <div
    class="grid md:grid-cols-2 gap-7 pb-10 items-start"
    v-if="state.userData?.personalInformation"
  >
    <!-- <ClientOnly> -->
    <InfoCard
      :title="'Personal Information'"
      :is-editing="isEditingPersonal"
      @save="updatePersonalInfo"
      @toggle="isEditingPersonal = !isEditingPersonal"
      @cancel="resetPersonalInfo"
    >
      <div class="mt-4 grid gap-3">
        <!-- <ClientOnly> -->
        <InfoCardInput
          :is-editing="isEditingPersonal"
          v-for="personal in personalInformations"
          :key="personal.variableName"
          :value="personalInfo[personal.variableName as keyof typeof personalInfo]"
          v-model="personalInfo[personal.variableName as keyof typeof personalInfo]"
          :subtitle="personal.subtitle"
          :placeholder="personal.placeholder"
        />
        <!-- </ClientOnly> -->
      </div>
    </InfoCard>
    <InfoCard
      :title="'ID Proof'"
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
          :subtitle="idProof.subtitle"
          :placeholder="idProof.placeholder"
        />
      </div>
    </InfoCard>
    <!-- </ClientOnly> -->
  </div>
</template>
<script setup lang="ts">
import { IDProofs, personalInformations } from "~/mainFrame";
import { useGlobalSettingStore } from "~/store/globalSetting";
import type { IDProofType, PersonalInfoType } from "~/types/type";

definePageMeta({
  layout: "profile",
  middleware: "auth",
});
const state = useGlobalSettingStore();
// Personal Information
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
const updatePersonalInfo = async () => {
  if (!state.user?.$id) return;
  const updateUserPerInf = await useAppwriteDocumentUpdate(state.user?.$id, { personalInformation: JSON.stringify(personalInfo.value) });
};
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
  const updateUserPerInf = await useAppwriteDocumentUpdate(state.user?.$id, { IDProof: JSON.stringify(IDProof.value) });
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

onMounted(() => state.setRouteName("Profile"));
</script>
