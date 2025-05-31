import React from "react";
import { FormField, FormItem, FormLabel, FormControl, FormMessage, FormDescription } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import ArrayInputField from "../ArrayInputField";
import { Checkbox } from "@/components/ui/checkbox";

const RulesEligibilityForm = ({ form, isMobile }: { form: any; isMobile: boolean }) => {
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
    <Accordion type="single" collapsible className="w-full">
      <AccordionItem value="general-rules">
        <AccordionTrigger>General Rules</AccordionTrigger>
        <AccordionContent>
          <div className="space-y-4">
            <div>
              <ArrayInputField
                label="General Rules"
                values={termsArray.general_rules}
                onChange={(values) => {
                  setTermsArray(prev => ({ ...prev, general_rules: values }));
                  form.setValue("terms_and_conditions.general_rules", values);
                }}
                placeholder="Add general rule and press Enter"
                error={form.formState.errors.terms_and_conditions?.general_rules?.message?.toString()}
              />
            </div>

            <div>
              <ArrayInputField
                label="Violations"
                values={termsArray.violations}
                onChange={(values) => {
                  setTermsArray(prev => ({ ...prev, violations: values }));
                  form.setValue("terms_and_conditions.violations", values);
                }}
                placeholder="Add violation and press Enter"
              />
            </div>
          </div>
        </AccordionContent>
      </AccordionItem>

      <AccordionItem value="eligibility">
        <AccordionTrigger>Eligibility</AccordionTrigger>
        <AccordionContent>
          <div className="space-y-4">
            <FormField
              control={form.control}
              name="terms_and_conditions.eligibility.age_limit"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Age Limit</FormLabel>
                  <FormControl>
                    <Input placeholder="e.g., 18+, Under 21" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="terms_and_conditions.eligibility.gender"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Gender Restrictions</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select gender restriction" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent position={isMobile ? "popper" : "item-aligned"}>
                      <SelectItem value="male">Male Only</SelectItem>
                      <SelectItem value="female">Female Only</SelectItem>
                      <SelectItem value="mixed">Mixed/Any</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div>
              <ArrayInputField
                label="Required Proof Documents"
                values={termsArray.proof_required}
                onChange={(values) => {
                  setTermsArray(prev => ({ ...prev, proof_required: values }));
                  form.setValue("terms_and_conditions.eligibility.proof_required", values);
                }}
                placeholder="Add required document and press Enter"
              />
            </div>
          </div>
        </AccordionContent>
      </AccordionItem>

      <AccordionItem value="match-rules">
        <AccordionTrigger>Match Rules</AccordionTrigger>
        <AccordionContent>
          <div className="space-y-4">
            <FormField
              control={form.control}
              name="terms_and_conditions.match_rules.duration"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Match Duration</FormLabel>
                  <FormControl>
                    <Input placeholder="e.g., 90 minutes, Two halves of 45 minutes" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="terms_and_conditions.match_rules.timeouts"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Timeouts per Team</FormLabel>
                  <FormControl>
                    <Input type="number" min="0" placeholder="Enter number of timeouts" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="terms_and_conditions.match_rules.substitutions"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Player Substitutions</FormLabel>
                  <FormControl>
                    <Input type="number" min="0" placeholder="Enter max number of substitutions" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div>
              <ArrayInputField
                label="Special Conditions"
                values={termsArray.special_conditions}
                onChange={(values) => {
                  setTermsArray(prev => ({ ...prev, special_conditions: values }));
                  form.setValue("terms_and_conditions.match_rules.special_conditions", values);
                }}
                placeholder="Add special condition and press Enter"
              />
            </div>
          </div>
        </AccordionContent>
      </AccordionItem>

      <AccordionItem value="fair-play">
        <AccordionTrigger>Fair Play</AccordionTrigger>
        <AccordionContent>
          <div className="space-y-4">
            <div>
              <ArrayInputField
                label="Code of Conduct"
                values={termsArray.code_of_conduct}
                onChange={(values) => {
                  setTermsArray(prev => ({ ...prev, code_of_conduct: values }));
                  form.setValue("terms_and_conditions.fair_play.code_of_conduct", values);
                }}
                placeholder="Add code of conduct rule and press Enter"
                error={form.formState.errors.terms_and_conditions?.fair_play?.code_of_conduct?.message?.toString()}
              />
            </div>

            <div>
              <ArrayInputField
                label="Penalties"
                values={termsArray.penalties}
                onChange={(values) => {
                  setTermsArray(prev => ({ ...prev, penalties: values }));
                  form.setValue("terms_and_conditions.fair_play.penalties", values);
                }}
                placeholder="Add penalty and press Enter"
              />
            </div>

            <div>
              <ArrayInputField
                label="Disqualification Criteria"
                values={termsArray.disqualification_criteria}
                onChange={(values) => {
                  setTermsArray(prev => ({ ...prev, disqualification_criteria: values }));
                  form.setValue("terms_and_conditions.fair_play.disqualification_criteria", values);
                }}
                placeholder="Add disqualification criteria and press Enter"
              />
            </div>
          </div>
        </AccordionContent>
      </AccordionItem>

      <AccordionItem value="appeal-process">
        <AccordionTrigger>Appeal Process</AccordionTrigger>
        <AccordionContent>
          <div className="space-y-4">
            <FormField
              control={form.control}
              name="terms_and_conditions.appeal_process.allowed"
              render={({ field }) => (
                <FormItem className="flex flex-row items-start space-x-3 space-y-0 p-4 rounded-md border">
                  <FormControl>
                    <Checkbox
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                  </FormControl>
                  <div className="space-y-1 leading-none">
                    <FormLabel>Allow Appeals</FormLabel>
                    <FormDescription>
                      Teams can appeal against decisions
                    </FormDescription>
                  </div>
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="terms_and_conditions.appeal_process.appeal_duration"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Appeal Duration</FormLabel>
                  <FormControl>
                    <Input placeholder="e.g., 24 hours, 1 hour after match" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="terms_and_conditions.appeal_process.appeal_fee"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Appeal Fee</FormLabel>
                  <FormControl>
                    <Input type="number" min="0" placeholder="Enter appeal fee amount" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        </AccordionContent>
      </AccordionItem>

      <AccordionItem value="game-description">
        <AccordionTrigger>Game Description</AccordionTrigger>
        <AccordionContent>
          <div className="space-y-4">
            <FormField
              control={form.control}
              name="gameDescription.specialPlay"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Special Play Count</FormLabel>
                  <FormControl>
                    <Input type="number" min="0" placeholder="Enter number of special plays" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="gameDescription.playUnit"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Play Unit</FormLabel>
                  <FormControl>
                    <Input placeholder="e.g., Points, Goals, Runs" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div>
              <ArrayInputField
                label="Penalty Codes"
                values={termsArray.penalty_code}
                onChange={(values) => {
                  setTermsArray(prev => ({ ...prev, penalty_code: values }));
                  form.setValue("gameDescription.penaltyCode", values);
                }}
                placeholder="Add penalty code and press Enter"
              />
            </div>
          </div>
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
};

export default RulesEligibilityForm;