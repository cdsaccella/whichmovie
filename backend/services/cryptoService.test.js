import { assertEquals } from "https://deno.land/std/testing/asserts.ts";
import { getEncryptedText, assertEncryptedText } from "./cryptoService.js";

Deno.test("Assert Encrypted Text Right", () => {
  const testText = "Test 123";
  const encryptedText = getEncryptedText(testText);
  assertEquals(assertEncryptedText("Test 123", encryptedText), true);
});

Deno.test("Assert Encrypted Text Wrong", () => {
  const testText = "Test 123";
  const encryptedText = getEncryptedText(testText);
  assertEquals(assertEncryptedText("Test 1234", encryptedText), false);
});