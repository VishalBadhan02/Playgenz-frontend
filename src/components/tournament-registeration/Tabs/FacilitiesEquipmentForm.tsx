import React from "react";
import { FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import ArrayInputField from "../ArrayInputField";
import { Checkbox } from "@/components/ui/checkbox";

const FacilitiesEquipmentForm = ({ form, isMobile }: { form: any; isMobile: boolean }) => {
    const [termsArray, setTermsArray] = React.useState<Record<string, string[]>>({
        general_rules: [],
        violations: [],
        proof_required: [],
        equipment_list: [],
        special_conditions: [],
        code_of_conduct: [],
        penalties: [],
        disqualification_criteria: [],
        penalty_code: [],
        equipment_types: [],
    });
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
            <div>
                <h3 className="text-lg font-medium mb-4">Facilities</h3>
                <div className="space-y-4">
                    <FormField
                        control={form.control}
                        name="facilities.waterTank"
                        render={({ field }) => (
                            <FormItem className="flex flex-row items-start space-x-3 space-y-0 p-2">
                                <FormControl>
                                    <Checkbox
                                        checked={field.value}
                                        onCheckedChange={field.onChange}
                                    />
                                </FormControl>
                                <div className="space-y-1 leading-none">
                                    <FormLabel>Water Tank</FormLabel>
                                </div>
                            </FormItem>
                        )}
                    />

                    <FormField
                        control={form.control}
                        name="facilities.lightning"
                        render={({ field }) => (
                            <FormItem className="flex flex-row items-start space-x-3 space-y-0 p-2">
                                <FormControl>
                                    <Checkbox
                                        checked={field.value}
                                        onCheckedChange={field.onChange}
                                    />
                                </FormControl>
                                <div className="space-y-1 leading-none">
                                    <FormLabel>Lighting</FormLabel>
                                </div>
                            </FormItem>
                        )}
                    />

                    <FormField
                        control={form.control}
                        name="facilities.commentators"
                        render={({ field }) => (
                            <FormItem className="flex flex-row items-start space-x-3 space-y-0 p-2">
                                <FormControl>
                                    <Checkbox
                                        checked={field.value}
                                        onCheckedChange={field.onChange}
                                    />
                                </FormControl>
                                <div className="space-y-1 leading-none">
                                    <FormLabel>Commentators</FormLabel>
                                </div>
                            </FormItem>
                        )}
                    />

                    <FormField
                        control={form.control}
                        name="facilities.duck"
                        render={({ field }) => (
                            <FormItem className="flex flex-row items-start space-x-3 space-y-0 p-2">
                                <FormControl>
                                    <Checkbox
                                        checked={field.value}
                                        onCheckedChange={field.onChange}
                                    />
                                </FormControl>
                                <div className="space-y-1 leading-none">
                                    <FormLabel>Duck</FormLabel>
                                </div>
                            </FormItem>
                        )}
                    />

                    <FormField
                        control={form.control}
                        name="facilities.jursey"
                        render={({ field }) => (
                            <FormItem className="flex flex-row items-start space-x-3 space-y-0 p-2">
                                <FormControl>
                                    <Checkbox
                                        checked={field.value}
                                        onCheckedChange={field.onChange}
                                    />
                                </FormControl>
                                <div className="space-y-1 leading-none">
                                    <FormLabel>Jersey</FormLabel>
                                </div>
                            </FormItem>
                        )}
                    />
                </div>
            </div>

            <div>
                <h3 className="text-lg font-medium mb-4">Equipment</h3>
                <div className="space-y-4">
                    <FormField
                        control={form.control}
                        name="facilities.resourses.avalability"
                        render={({ field }) => (
                            <FormItem className="flex flex-row items-start space-x-3 space-y-0 p-2">
                                <FormControl>
                                    <Checkbox
                                        checked={field.value}
                                        onCheckedChange={field.onChange}
                                    />
                                </FormControl>
                                <div className="space-y-1 leading-none">
                                    <FormLabel>Equipment Available</FormLabel>
                                </div>
                            </FormItem>
                        )}
                    />

                    <div>
                        <ArrayInputField
                            label="Types of Equipment"
                            values={termsArray.equipment_types}
                            onChange={(values) => {
                                setTermsArray(prev => ({ ...prev, equipment_types: values }));
                                form.setValue("facilities.resourses.types_of_equpements", values);
                            }}
                            placeholder="Add equipment type and press Enter"
                        />
                    </div>
                </div>
            </div>

            <div className="col-span-1 md:col-span-2">
                <h3 className="text-lg font-medium mb-4">Equipment Rules</h3>
                <div className="space-y-4">
                    <FormField
                        control={form.control}
                        name="terms_and_conditions.equipment_rules.standard_equipment"
                        render={({ field }) => (
                            <FormItem className="flex flex-row items-start space-x-3 space-y-0 p-2">
                                <FormControl>
                                    <Checkbox
                                        checked={field.value}
                                        onCheckedChange={field.onChange}
                                    />
                                </FormControl>
                                <div className="space-y-1 leading-none">
                                    <FormLabel>Standard Equipment Mandatory</FormLabel>
                                </div>
                            </FormItem>
                        )}
                    />

                    <FormField
                        control={form.control}
                        name="terms_and_conditions.equipment_rules.custom_equipment_allowed"
                        render={({ field }) => (
                            <FormItem className="flex flex-row items-start space-x-3 space-y-0 p-2">
                                <FormControl>
                                    <Checkbox
                                        checked={field.value}
                                        onCheckedChange={field.onChange}
                                    />
                                </FormControl>
                                <div className="space-y-1 leading-none">
                                    <FormLabel>Custom Equipment Allowed</FormLabel>
                                </div>
                            </FormItem>
                        )}
                    />

                    <div>
                        <ArrayInputField
                            label="Required Equipment List"
                            values={termsArray.equipment_list}
                            onChange={(values) => {
                                setTermsArray(prev => ({ ...prev, equipment_list: values }));
                                form.setValue("terms_and_conditions.equipment_rules.equipment_list", values);
                            }}
                            placeholder="Add required equipment and press Enter"
                        />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default FacilitiesEquipmentForm;