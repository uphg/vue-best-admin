import XDivider from './x-divider'

export default function XDividerDemo() {
  return (
    <div class="p-6 space-y-8">
      <h2 class="text-xl font-bold mb-4">XDivider Component Demo</h2>

      <div>
        <h3 class="text-lg font-semibold mb-2">Basic Horizontal Divider</h3>
        <XDivider />
      </div>

      <div>
        <h3 class="text-lg font-semibold mb-2">Horizontal Divider with Text</h3>
        <XDivider text="OR" />
      </div>

      <div>
        <h3 class="text-lg font-semibold mb-2">Horizontal Divider with Slot</h3>
        <XDivider>
          <span class="text-blue-600">Custom Content</span>
        </XDivider>
      </div>

      <div>
        <h3 class="text-lg font-semibold mb-2">Dashed Divider</h3>
        <XDivider dashed text="Dashed" />
      </div>

      <div class="space-y-4">
        <h3 class="text-lg font-semibold mb-2">Different Sizes</h3>
        <div class="flex flex-col gap-4">
          <XDivider size="sm" text="Small" />
          <XDivider size="md" text="Medium" />
          <XDivider size="lg" text="Large" />
        </div>
      </div>

      <div class="space-y-4">
        <h3 class="text-lg font-semibold mb-2">Different Alignments</h3>
        <div class="flex flex-col gap-4">
          <XDivider align="left" text="Left Aligned" />
          <XDivider align="center" text="Center Aligned" />
          <XDivider align="right" text="Right Aligned" />
        </div>
      </div>

      <div>
        <h3 class="text-lg font-semibold mb-2">Custom Color</h3>
        <XDivider color="#3b82f6" text="Blue Divider" />
      </div>

      <div>
        <h3 class="text-lg font-semibold mb-2">Custom Margin</h3>
        <XDivider margin="my-8" text="Custom Margin" />
      </div>

      <div>
        <h3 class="text-lg font-semibold mb-2">Vertical Divider</h3>
        <div class="flex h-32 items-center">
          <div class="flex-1">Left Content</div>
          <XDivider direction="vertical" />
          <div class="flex-1">Right Content</div>
        </div>
      </div>

      <div>
        <h3 class="text-lg font-semibold mb-2">Vertical Divider with Text</h3>
        <div class="flex h-32 items-center">
          <div class="flex-1">Left Content</div>
          <XDivider direction="vertical" text="OR" />
          <div class="flex-1">Right Content</div>
        </div>
      </div>
    </div>
  )
}
