<?php

namespace App\Entity;

interface IRestful
{
    public function toRestfulArray(): array;
    public function fromRestfulArray(array $arr): static;

}
